import type { NextFunction, Request, Response } from 'express';
import {HttpStatusCode} from "../../utils/index.js";
import {NotFundError} from "../../errors/index.js";

// export const queryValidator = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   //@ts-ignore
//   req.message = 'This was added by middleware';
//   next();
// };

export const queryValidator = (params: string[]) => {
  return (req:Request, res:Response, next:NextFunction) => {
    for (const param of params) {
      if (!(param in req.query)) {
        // res.status(HttpStatusCode.SERVER_ERROR).send({
        //   message: `${param} not found`
        // });
        throw new NotFundError({
          message: `${param} not found`
        })
        return;
      }
    }
    next();
  }
};

