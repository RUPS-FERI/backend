import { ApiError } from './ApiError.js';
import type { KnownApiErrorBody } from './types/index.js';
import { HttpStatusCode } from '../utils/index.js';

export class NotFundError extends ApiError {
  constructor(data: KnownApiErrorBody) {
    super({
      additionalData: data.additionalData,
      message: data.message,
      status: HttpStatusCode.NOT_FOUND,
    });
  }
}