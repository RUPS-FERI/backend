import { ApiError } from './ApiError.js';
import { HttpStatusCode } from '../utils/index.js';
import type { KnownApiErrorBody } from './types/index.js';

export class AlreadyExistsError extends ApiError {
  constructor(data: KnownApiErrorBody) {
    super({
      additionalData: data.additionalData,
      message: data.message,
      status: HttpStatusCode.ALREADY_EXISTS,
    });
  }
}