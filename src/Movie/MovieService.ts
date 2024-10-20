import { readFile } from 'fs/promises';
import ThemeRepository from '../Theme/ThemeRepository';
import { Movies, MoviesPagination, MoviesResponse } from './MovieModel';
import MovieRepository from './MovieRepository';
import {
  clearMongoResponse,
  createError,
  isNumeric,
  paginate,
  setPagination,
  validateFields,
  validatePagination,
  validateThemesId,
} from '../Utils/UtilsService';
import { FilterQuery } from 'mongoose';
import { OrderEnum, PaginationType } from '../Utils/PaginationInterface';
import { CustomJwtPayload } from '../User/UserEntity';
import UserService from '../User/UserService';
import { INVALID_USER_ERROR } from '../User/UserConstants';

class MovieService {
  private readonly themeRepository: ThemeRepository;
  private readonly movieRepository: MovieRepository;

  constructor() {
    this.themeRepository = new ThemeRepository();
    this.movieRepository = new MovieRepository();
  }

  async importMovies() {
    try {
      const data = await readFile('movies.json', 'utf-8');
      const movies: MoviesResponse[] = JSON.parse(data);

      const movieDocuments = movies.map((movie) => ({
        id: movie.id,
        name: movie.title,
        theme_id: movie.genre_ids,
      }));

      const newMovies = await this.movieRepository.create(movieDocuments);
      return newMovies.map((it: any) => clearMongoResponse(it));
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }

  public async get(id: number | string): Promise<Movies> {
    if (!isNumeric(id)) throw createError('invalid id', 400);
    id = Number(id);

    try {
      const movie = await this.movieRepository.get(id);

      if (!movie) throw createError('Movie not found', 404);

      return clearMongoResponse(movie);
    } catch (error: any) {
      console.error(error);
      throw createError(error.message, 500);
    }
  }

  public async count(): Promise<Number> {
    try {
      const count = await this.movieRepository.count();
      return count;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  async order(query: MoviesPagination | any, user: CustomJwtPayload): Promise<PaginationType<Movies>> {
    const { size, offset, title, themes, orderBy, ...rest } = query;
    validatePagination({ size, offset });
    validateFields(rest);

    if (title) this.validateTitle(title);

    const myUser = await UserService.me(user);

    if (!myUser) throw createError(INVALID_USER_ERROR, 401);
    if (!myUser.packs) throw createError('User does not have any packs. Please create a pack and try again.', 400);

    const userThemes = myUser.packs.themes;

    const themes_id = validateThemesId(themes, userThemes);

    if (orderBy && !Object.values(OrderEnum).includes(orderBy)) {
      throw createError('orderBy must be either "asc" or "desc"', 400);
    }

    try {
      const { size, offset } = setPagination(query);
      const newQuery: FilterQuery<Movies> = { theme_id: { $in: userThemes } };

      if (themes_id.length) {
        newQuery.theme_id = { $in: themes_id };
      }

      if (title) {
        const newTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        newQuery.name = { $regex: new RegExp(newTitle, 'i') };
      }

      const { movies, total } = await this.movieRepository.findAllPaginated(newQuery, size, offset, orderBy);
      return paginate(size, offset, movies, total);
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  public async find(ids: string | any, title?: string | any): Promise<Movies[]> {
    let movieIds = ids ? ids.split(',') : undefined;
    if (ids && !movieIds.every(isNumeric)) throw createError('One or more IDs are invalid', 400);
    movieIds = movieIds ? movieIds.map(Number) : undefined;

    if (title) this.validateTitle(title);

    try {
      const query: FilterQuery<Movies> = {};

      if (movieIds && movieIds.length > 0) {
        query.id = { $in: movieIds };
      }

      if (title) {
        const newTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        query.name = {
          $regex: new RegExp(newTitle, 'i'),
        };
      }

      const movies = await this.movieRepository.find(query);

      return movies.map((it: Movies) => clearMongoResponse(it));
    } catch (error: any) {
      console.error(error);
      throw createError(error.message, 500);
    }
  }

  private validateTitle(title: string): void {
    if (title.trim().length < 2) throw createError('Title must be at least 2 characters long', 400);
  }
}

export default new MovieService();
