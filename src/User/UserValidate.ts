import moment from 'moment';
import { createError, validateFields } from '../Utils/UtilsService';
import { CreateUserInput, LoginInput } from './UserEntity';
import {
  BORNDATE_ERROR_MESSAGE,
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  INVALID_BORNDATE_ERROR_MESSAGE,
  INVALID_CODE_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_NOT_MATCH,
} from './UserConstants';
import { ResendResponse } from './CodeModel';

class UserValidate {
  private nameValidate(name: string): string | void {
    if (!name || name.trim().length < 3 || name.length > 150) return NAME_ERROR_MESSAGE;
  }

  private borndateValidate(borndate: string | Date): string | void {
    const date = moment(borndate, 'DD/MM/YYYY', true);
    const currentDate = moment();
    if (!borndate || !date.isValid()) return BORNDATE_ERROR_MESSAGE;
    if (date.isAfter(currentDate)) return INVALID_BORNDATE_ERROR_MESSAGE;
  }

  public emailValidate(email: string): string | void {
    const emailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!email || !emailRegex.test(email)) return EMAIL_ERROR_MESSAGE;
  }

  public passwordValidate(password: string): string | void {
    const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/);
    if (!password || !passwordRegex.test(password)) return PASSWORD_ERROR_MESSAGE;
  }

  public confirmPasswordValidate(confirm_password: string): string | void {
    const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/);
    if (!confirm_password || !passwordRegex.test(confirm_password)) return CONFIRM_PASSWORD_ERROR_MESSAGE;
  }

  public passwordEqual(password: string, confirm_password: string): string | void {
    if (!password || !confirm_password) return PASSWORD_NOT_MATCH;
    if (password !== confirm_password) return PASSWORD_NOT_MATCH;
  }

  public codeValidate(code: string): string | void {
    const codeRegex = RegExp(/^\d{6}$/);
    if (!code || !codeRegex.test(code)) return INVALID_CODE_ERROR_MESSAGE;
  }

  public validateResendPassowrd(data: ResendResponse): void {
    const { email, code, password, confirm_password, ...rest } = data;

    validateFields(rest);

    const errors: string[] | any = [
      this.codeValidate(code),
      this.emailValidate(email),
      this.passwordEqual(password, confirm_password),
      this.passwordValidate(password),
      this.confirmPasswordValidate(confirm_password),
    ].filter((error) => error);

    if (errors.length) throw createError(errors, 400);
  }

  public validateCreateUser(data: CreateUserInput): void {
    const { name, email, borndate, password, ...rest } = data;

    validateFields(rest);

    const errors: string[] | any = [
      this.nameValidate(name),
      this.borndateValidate(borndate),
      this.emailValidate(email),
      this.passwordValidate(password),
    ].filter((error) => error);

    if (errors.length) throw createError(errors, 400);
  }

  public validateUserLogin(data: LoginInput): void {
    const { email, password, ...rest } = data;

    validateFields(rest);

    const errors: string[] | any = [this.emailValidate(email), this.passwordValidate(password)].filter(
      (error) => error,
    );

    if (errors.length) throw createError(errors, 400);
  }
}

export default UserValidate;
