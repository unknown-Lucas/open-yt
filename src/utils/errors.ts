import { HttpException, HttpStatus } from '@nestjs/common';

export const issue = (message: string, statusCode: HttpStatus) => {
  throw new HttpException(message, statusCode);
};
