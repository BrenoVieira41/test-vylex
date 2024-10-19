import { FilterQuery } from 'mongoose';
import { Pagination, PaginationType } from '../Utils/PaginationInterface';
import {
  clearMongoResponse,
  createError,
  isNumeric,
  paginate,
  setPagination,
  validatePagination,
} from '../Utils/UtilsService';
import { GenreResponse, Themes } from './ThemeModel';
import ThemeRepository from './ThemeRepository';

class ThemeService {
  private readonly themeRepository: ThemeRepository;

  constructor() {
    this.themeRepository = new ThemeRepository();
  }

  public async getThemesApi(): Promise<Themes[]> {
    try {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
      const authorization = process.env.API_BARREAR || 'test';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: authorization,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch themes');
      }

      const themes: GenreResponse | any = await response.json();
      return themes.genres;
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }

  public async createThemesApi(): Promise<Themes[]> {
    try {
      const themes: Themes | any = await this.getThemesApi();

      const ids = themes.map((theme: Themes) => theme.id);

      const existingThemes = await this.themeRepository.findAllById(ids);
      const existingIds = existingThemes.map((theme) => theme.id);

      let setThemes = themes.filter((theme: Themes) => !existingIds.includes(theme.id));

      if (setThemes.length === 0) {
        return [];
      }

      let newThemes = await this.themeRepository.create(setThemes);

      newThemes = newThemes.map((it: any) => clearMongoResponse(it));
      return newThemes;
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }

  async findThemes(query: Pagination): Promise<PaginationType<Themes>> {
    validatePagination(query);

    try {
      const { size, offset } = setPagination(query);
      const { themes, total } = await this.themeRepository.findAllPaginated(size, offset);

      return paginate(size, offset, themes, total);
    } catch (error: any) {
      console.error(error);
      throw createError(error.message, 500);
    }
  }

  public async get(id: number | string): Promise<Themes> {
    if (!isNumeric(id)) throw createError('invalid id', 400);
    id = Number(id);

    try {
      const theme = await this.themeRepository.get(id);

      if (!theme) throw createError('Theme not found', 404);

      return clearMongoResponse(theme);
    } catch (error: any) {
      console.error(error);
      throw createError(error.message, 500);
    }
  }

  public async find(ids: string | any): Promise<Themes[]> {
    let themesIds = ids ? ids.split(',') : undefined;
    if (ids && !themesIds.every(isNumeric)) throw createError('One or more IDs are invalid', 400);
    themesIds = themesIds ? themesIds.map((it: string) => Number(it)) : undefined;

    try {
      const query: FilterQuery<Themes> = {};

      if (themesIds && themesIds.length > 0) {
        query.id = { $in: themesIds };
      }

      const themes = await this.themeRepository.find(query);
      return themes.map((it: any) => clearMongoResponse(it));
    } catch (error: any) {
      console.error(error);
      throw createError(error.message, 500);
    }
  }

  public async count(): Promise<Number> {
    try {
      const countThemes = await this.themeRepository.count();
      return countThemes;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
}

export default new ThemeService();
