import ThemeRepository from '../Theme/ThemeRepository';
import ThemeService from '../Theme/ThemeService';
import { INVALID_USER_ERROR } from '../User/UserConstants';
import { CustomJwtPayload } from '../User/UserEntity';
import UserService from '../User/UserService';
import { createError } from '../Utils/UtilsService';
import { PACK_AREADY_EXIST, PACK_NOT_FOUND, THEME_NOT_FOUND } from './PackConstants';
import { PackInput, Packs } from './PackEntity';
import PackRepository from './PackRepository';
import PackValidate from './PackValidate';

class PackService {
  private readonly packRepository: PackRepository;
  private readonly packValidate: PackValidate;

  constructor() {
    this.packRepository = new PackRepository();
    this.packValidate = new PackValidate();
  }

  public async create(data: PackInput, user: CustomJwtPayload): Promise<Packs> {
    this.packValidate.validatePack(data);

    try {
      const { themes } = data;
      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      const { name, id } = myUser;

      const packAlreadyExist = await this.packRepository.findByUser(id);

      if (packAlreadyExist) throw createError(PACK_AREADY_EXIST, 409);

      const [firstName, secondName] = name.split(' ');
      const formatName = this.formatName(firstName, secondName);
      const packName = `${formatName}Pack`;

      const themesExist = await ThemeService.findByPack(themes);

      const newThemesId = themesExist.map((it) => it.id);

      if (!newThemesId.length) throw createError(THEME_NOT_FOUND, 400);

      const newPack = await this.packRepository.create({ name: packName, user_id: id, themes: newThemesId });

      return newPack;
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async get(user: CustomJwtPayload): Promise<Packs> {
    try {
      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      const pack = await this.packRepository.findByUser(myUser.id);

      if (!pack) throw createError(PACK_NOT_FOUND, 409);

      return pack;
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async update(data: PackInput, user: CustomJwtPayload): Promise<Packs> {
    this.packValidate.validatePack(data);

    try {
      const { themes } = data;
      const myUser = await UserService.me(user);

      if (!myUser) throw createError(INVALID_USER_ERROR, 401);

      const pack = await this.packRepository.findByUser(myUser.id);

      if (!pack) throw createError(PACK_NOT_FOUND, 409);

      const themesExist = await ThemeService.findByPack(themes);
      const newThemesId = themesExist.map((it) => it.id);

      if (!newThemesId.length) throw createError(THEME_NOT_FOUND, 400);

      const updatePack = await this.packRepository.update(pack.id, newThemesId);

      return updatePack;
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  private formatName(firstName: string, secondName?: string): string {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const formatName = secondName ? `${capitalize(firstName)}${capitalize(secondName)}` : capitalize(firstName);
    return formatName;
  }
}

export default new PackService();
