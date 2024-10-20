import MovieService from '../Movie/MovieService';
import { NO_EQUAL_THEME, NO_PACK_AREADY_EXIST } from '../Pack/PackConstants';
import ThemeService from '../Theme/ThemeService';
import { INVALID_USER_ERROR } from '../User/UserConstants';
import { CustomJwtPayload } from '../User/UserEntity';
import UserService from '../User/UserService';
import { createError, validateThemesId } from '../Utils/UtilsService';
import { MOVIE_ALREADY_WATCHED, MOVIE_NOT_FOUND, NOT_ENOUGH_WATCHED_MOVIES } from './WatchedConstants';
import { UserWatchData, Watcheds, WatchedInput } from './WatchedEntity';
import WatchedRepository from './WatchedRepository';
import WatchedValidate from './WatchedValidate';

class WatchedService {
  private readonly watchedRepository: WatchedRepository;
  private readonly watchedValidate: WatchedValidate;

  constructor() {
    this.watchedRepository = new WatchedRepository();
    this.watchedValidate = new WatchedValidate();
  }

  public async create(data: WatchedInput, user: CustomJwtPayload): Promise<Watcheds> {
    this.watchedValidate.validateWatch(data);

    try {
      const { movie_id } = data;

      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      if (!myUser.packs) throw createError(NO_PACK_AREADY_EXIST, 400);
      const { id, packs } = myUser;

      const movieAlreadyWatched = await this.watchedRepository.watched(data.movie_id, id);

      if (movieAlreadyWatched) throw createError(MOVIE_ALREADY_WATCHED, 409);

      const userThemes = packs.themes;
      const movie = await MovieService.get(Number(movie_id));

      const isValidTheme = movie.theme_id.some((it) => userThemes.includes(it));

      if (!isValidTheme) throw createError(MOVIE_NOT_FOUND, 400);

      const newPack = await this.watchedRepository.create({
        movie_id: movie.id,
        user_id: id,
        movie_name: movie.name,
        themes: movie.theme_id,
      });

      return newPack;
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async get(id: string | string, user: CustomJwtPayload): Promise<Watcheds> {
    this.watchedValidate.idValidate(id);

    try {
      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      const watched = await this.watchedRepository.get(id, myUser.id);

      if (!watched) throw createError(MOVIE_NOT_FOUND, 400);

      return watched;
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async infos(user: CustomJwtPayload): Promise<any> {
    try {
      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      const watched = await this.watchedRepository.findAll(myUser.id);

      if (!watched.length) throw createError(NOT_ENOUGH_WATCHED_MOVIES, 400);

      return this.Pagination(watched);
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  private async Pagination(data: Watcheds[]): Promise<any> {
    const totalFilmsWatched = data.length;
    const lastFilmWatched = data.reduce((latest, current) =>
      new Date(current.created_at) > new Date(latest.created_at) ? current : latest,
    );

    const themesUsing: any = {};

    data.forEach((item) => {
      item.themes.forEach((theme) => {
        if (!themesUsing[theme]) themesUsing[theme] = 0;
        themesUsing[theme] += 1;
      });
    });

    const mostWatchedThemeId = Object.keys(themesUsing).reduce((a, b) => (themesUsing[a] > themesUsing[b] ? a : b));
    const themeName = await ThemeService.get(mostWatchedThemeId);

    return {
      userId: data[0].user_id,
      totalFilmsWatched,
      mostWatchedTheme: {
        themeId: mostWatchedThemeId,
        themeName: themeName.name,
        totalFilmsWatched: themesUsing[mostWatchedThemeId],
      },
      lastFilmWatched: {
        movieId: lastFilmWatched.movie_id,
        movieName: lastFilmWatched.movie_name,
      },
    };
  }

  async unwatch(id: string | string, user: CustomJwtPayload): Promise<String> {
    this.watchedValidate.idValidate(id);

    try {
      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      const watched = await this.watchedRepository.get(id, myUser.id);

      if (!watched) throw createError(MOVIE_NOT_FOUND, 400);

      await this.watchedRepository.unwatch(id);

      return 'Unwatch movie successfully.';
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }
}

export default new WatchedService();
