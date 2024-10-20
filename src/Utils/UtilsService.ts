import { Document } from 'mongoose';
import { Pagination, PaginationType } from './PaginationInterface';
import moment from 'moment';
import { NO_EQUAL_THEME } from '../Pack/PackConstants';

function clearMongoResponse(object: Document) {
  const response = object.toObject();
  Reflect.deleteProperty(response, '_id');
  Reflect.deleteProperty(response, '__v');
  return response;
}

function validateFields(rest: Object): void {
  if (Object.keys(rest).length > 0) throw createError(`Unexpected fields: [${Object.keys(rest).join(', ')}]`, 400);
}

function isNumeric(value: number | string): boolean {
  const numValue = Number(value);
  return !isNaN(numValue) && isFinite(numValue);
}

function createError(messages: string | string[], status?: number): Error {
  const errorMessage = Array.isArray(messages) ? messages.join('\n') : messages;
  const error = new Error(errorMessage);
  (error as any).status = status ? status : 500;
  return error;
}

function setPagination(query: Pagination) {
  const { size, offset } = query;
  const pageSize = size ? Number(size) : 10;
  const pageOffset = offset ? Math.max(Number(offset), 1) : 1;

  return { size: pageSize, offset: pageOffset };
}

function paginate<T>(size: number, offset: number, data: T[], total: number): PaginationType<T> {
  const totalPages = Math.ceil(total / size);
  const currentPageNumber = offset;
  const lastPage = currentPageNumber >= totalPages;
  const firstPage = currentPageNumber === 1;

  const newDate = data.map((it: any) => clearMongoResponse(it));

  return {
    data: newDate,
    pagination: {
      pageNumber: currentPageNumber,
      pageSize: size,
      totalPages,
      lastPage,
      firstPage,
      total,
    },
  };
}

function validatePagination(input: Pagination): void {
  const erros: string[] = [];
  const { size, offset, ...rest } = input;

  validateFields(rest);

  if (size && !isNumeric(size)) {
    erros.push('Invalid size: must be a valid number');
  }

  if (offset && !isNumeric(offset)) {
    erros.push('Invalid offset: must be a valid number');
  }

  if (erros.length > 0) {
    throw createError(erros, 400);
  }
}

function parseDateString(dateString: string | Date): Date {
  return moment(dateString, 'DD/MM/YYYY').toDate();
}

function formatDate(date: Date) {
  return moment(date).format('DD/MM/YYYY');
}

function validateThemesId(theme_id: string | undefined, userThemes: number[]): number[] {
  if (!theme_id) return [];

  const themes_id = theme_id.split(',').map(Number);

  const isValid = themes_id.every(isNumeric);
  if (!isValid) throw createError('theme_id must be a number or an array of numbers', 400);

  const invalidThemes = themes_id.filter((id) => !userThemes.includes(id));
  if (invalidThemes.length > 0) {
    throw createError(NO_EQUAL_THEME, 400);
  }

  return themes_id;
}

export {
  clearMongoResponse,
  validateFields,
  createError,
  isNumeric,
  validatePagination,
  setPagination,
  paginate,
  parseDateString,
  formatDate,
  validateThemesId,
};
