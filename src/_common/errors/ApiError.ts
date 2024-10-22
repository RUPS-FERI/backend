import type { UnknownApiErrorBody } from './types/index.js';

export class ApiError implements Error {
  public readonly name: string;
  public readonly message: string;

  constructor(public readonly data: UnknownApiErrorBody) {
    this.message = data.message;
    this.name = 'Api Error';
  }
}