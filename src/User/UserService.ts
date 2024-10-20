import { sign } from 'jsonwebtoken';
import { createError, formatDate, parseDateString } from '../Utils/UtilsService';
import { CODE_NOT_FOUND, INVALID_USER_ERROR, LOGIN_MESSAGE_ERROR, USER_AREADY_EXIST, USER_NOT_FOUND } from './UserConstants';
import { CreateUserInput, CustomJwtPayload, LoginInput, Users } from './UserEntity';
import UserRepository from './UserRepository';
import UserValidate from './UserValidate';
import argon2 from 'argon2';
import { CodeResponse, ResendResponse } from './CodeModel';
import moment from 'moment';
import ThemeService from '../Theme/ThemeService';

class UserService {
  private readonly userRepository: UserRepository;
  private readonly userValidate: UserValidate;

  constructor() {
    this.userRepository = new UserRepository();
    this.userValidate = new UserValidate();
  }

  public async create(data: CreateUserInput): Promise<Users> {
    this.userValidate.validateCreateUser(data);

    try {
      const { email, password, borndate } = data;

      const userExit = await this.userRepository.findByEmail(email);

      if (userExit) throw createError(USER_AREADY_EXIST, 409);

      const hashedPassword = await argon2.hash(password);
      const parseBorndate = parseDateString(borndate);

      const user = await this.userRepository.create({ ...data, password: hashedPassword, borndate: parseBorndate });

      return this.userResponse(user);
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async userLogin(data: LoginInput) {
    this.userValidate.validateUserLogin(data);
    try {
      const { email, password } = data;
      const secret = process.env.JWT_SECRET || 'secret';
      const user = await this.userRepository.findByEmail(email);

      if (!user) throw createError(LOGIN_MESSAGE_ERROR, 401);
      const isValidPassword = await argon2.verify(user.password, password);

      if (!isValidPassword) throw createError(LOGIN_MESSAGE_ERROR, 401);

      const newUser = this.userResponse(user);
      Reflect.deleteProperty(newUser, 'borndate');

      const token = sign({ ...newUser }, secret, { expiresIn: '1d' });
      return { user, token };
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async me(user: CustomJwtPayload): Promise<Users> {
    try {
      const { id } = user;
      const me = await this.userRepository.findById(id);

      if (!me) throw createError(INVALID_USER_ERROR, 401);

      let formatUser: any = this.userResponse(me);

      if (me.packs) {
        const { packs } = me;

        const themes = await ThemeService.findByPack(packs.themes);
        const themesName = themes.map(it => it.name);

        formatUser.packs = {...packs, themesName};
      }

      return formatUser;
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async generateResetCode(email: string | any): Promise<CodeResponse> {
    try {
      const validateEmail = this.userValidate.emailValidate(email);
      if (validateEmail) throw createError(validateEmail, 400);

      const me = await this.userRepository.findByEmail(email);

      if (!me) throw createError(USER_NOT_FOUND, 401);

      const alreadyExistCode = await this.userRepository.getCode(email);

      if (alreadyExistCode) await this.userRepository.deleteCode(email);

      const code = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
      const passwordResetCode = await this.userRepository.saveCode({ code, user_email: email });

      const { user_email, created_at } = passwordResetCode;

      const expiration = moment(created_at).add(1, 'day').toDate();

      return { user_email, expiration, code };
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  async resetPassword(data: ResendResponse): Promise<String> {
    this.userValidate.validateResendPassowrd(data);

    try {
      const { email, password, code } = data;

      const user = await this.userRepository.findByEmail(email);

      if (!user) throw createError(USER_NOT_FOUND, 401);

      const alreadyExistCode = await this.userRepository.getCode(email);

      if (!alreadyExistCode || alreadyExistCode.code !== code) throw createError(CODE_NOT_FOUND, 400);

      const hashedPassword = await argon2.hash(password);

      await this.userRepository.update(user.id, hashedPassword);
      await this.userRepository.deleteCode(email);

      return 'Password updated successfully.';
    } catch (error: any) {
      const status = error.status ? error.status : 500;
      throw createError(error.message, status);
    }
  }

  private userResponse(data: Users): Users {
    Reflect.deleteProperty(data, 'password');
    data.borndate = formatDate(new Date(data.borndate));

    return data;
  }
}

export default new UserService();
