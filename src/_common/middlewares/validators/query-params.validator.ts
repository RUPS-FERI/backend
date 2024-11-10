import type { NextFunction, Response, Request } from 'express';
import { BadRequestError } from '../../errors/BarRequestError.js';

interface QueryParamField {
  name: string;
  required?: boolean;
  type: 'number' | 'string' | 'boolean';
}

export const queryParamValidator = (fields: QueryParamField[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (field.required === true && !(field.name in req.query)) {
        throw new BadRequestError({
          message: `Missing query param filed : ${field.name}`,
        });
      } else if (
        field.name in req.query &&
        !isReqFieldTypeOf(req.query[field.name] as string, field)
      ) {
        throw new BadRequestError({
          message: `Expected ${field.type} got ${typeof req.query[field.name]} for field : ${field.name}`,
        });
      }
    }
    next();
  };
};

function isReqFieldTypeOf(value: string, field: QueryParamField): boolean {
  if (field.type === 'number') {
    return !isNaN(+value);
  } else if (field.type === 'boolean') {
    return value === 'true' || value === 'false';
  }
  return true;
}
