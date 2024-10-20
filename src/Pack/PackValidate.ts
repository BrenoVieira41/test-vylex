import { createError, isNumeric, validateFields } from '../Utils/UtilsService';
import { THEME_ERROR_MESSAGE } from './PackConstants';
import { PackInput } from './PackEntity';

class PackValidate {
  public themesValidate(themes: number[]): string | void {
    if (!themes || !Array.isArray(themes)) return THEME_ERROR_MESSAGE;
    if (!themes.length || !themes.every(isNumeric)) return THEME_ERROR_MESSAGE;
  }

  public validatePack(data: PackInput): void {
    const { themes, ...rest } = data;

    validateFields(rest);

    const errors: string | any = this.themesValidate(themes);

    if (errors?.length) throw createError([errors], 400);
  }
}

export default PackValidate;
