export interface CustomError extends Error {
  status?: number;
}

export const PRISMA_ERROR = 'An unexpected error occurred. Please try again later';
