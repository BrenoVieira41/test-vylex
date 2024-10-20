import { createError, isNumeric, validateFields } from '../Utils/UtilsService';
import { ID_ERROR_MESSAGE, MOVIE_ERROR_MESSAGE } from './WatchedConstants';
import { WatchedInput } from './WatchedEntity';

class WatchedValidate {
  public MovieIdValidate(movie_id: string | any): string | void {
    if (!movie_id || !isNumeric(movie_id)) return MOVIE_ERROR_MESSAGE;
  }

  public idValidate(id: string): string | void {
    const idRegex = RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    if(!id || !idRegex.test(id)) throw createError([ID_ERROR_MESSAGE], 400);
  }

  public validateWatch(data: WatchedInput): void {
    const { movie_id, ...rest } = data;

    validateFields(rest);

    const errors: string | any = this.MovieIdValidate(movie_id);

    if (errors?.length) throw createError([errors], 400);
  }
}

export default WatchedValidate;
