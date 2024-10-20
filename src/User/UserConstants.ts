const INVALID_USER_ERROR = 'Invalid user. Please log in again.';
const NAME_ERROR_MESSAGE = 'Invalid name: must be between 3 and 150 characters.';
const EMAIL_ERROR_MESSAGE = 'Invalid email: must be a valid email address.';
const BORNDATE_ERROR_MESSAGE = 'Invalid bornDate: must be in the format DD/MM/YYYY.';
const INVALID_BORNDATE_ERROR_MESSAGE = 'Invalid born date: date must not be in the future.';
const INVALID_CODE_ERROR_MESSAGE = 'Invalid code provided. Please check and try again.';
const PASSWORD_NOT_MATCH = 'Passwords do not match. Please ensure both passwords are identical.';
const PASSWORD_ERROR_MESSAGE =
  'Invalid password: must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.';
const CONFIRM_PASSWORD_ERROR_MESSAGE =
  'Invalid confirm password: must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.';

const USER_AREADY_EXIST = 'User already exists';
const USER_NOT_FOUND = 'User not found.';
const CODE_NOT_FOUND = 'The provided code is valid but does not match any records in the database.';

const LOGIN_MESSAGE_ERROR = 'Invalid username or password.';

export {
  INVALID_USER_ERROR,
  NAME_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  BORNDATE_ERROR_MESSAGE,
  INVALID_BORNDATE_ERROR_MESSAGE,
  INVALID_CODE_ERROR_MESSAGE,
  PASSWORD_NOT_MATCH,
  PASSWORD_ERROR_MESSAGE,
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  USER_AREADY_EXIST,
  USER_NOT_FOUND,
  LOGIN_MESSAGE_ERROR,
  CODE_NOT_FOUND,
};
