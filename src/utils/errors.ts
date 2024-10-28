import { HttpException, HttpStatus } from '@nestjs/common';

export const issue = (message: string, statusCode: HttpStatus) => {
  throw new HttpException(message, statusCode);
};

export const catchError = async <T>(
  promise: Promise<T>,
): Promise<[Error | undefined, T | undefined]> => {
  try {
    return [undefined, await promise];
  } catch (error) {
    return [error, undefined];
  }
};
