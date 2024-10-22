import { HttpStatusCode } from '../../utils/index.js';

/** Used when status code of Api Error is not known  */
export interface UnknownApiErrorBody {
  readonly message: string;
  readonly status: HttpStatusCode;
  readonly additionalData?: object;
}