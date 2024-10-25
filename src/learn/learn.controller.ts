import {Request, Response} from "express";
import {HttpStatusCode} from "../_common/utils/index.js";

export const getLearn = (req: Request, res: Response) => {
    res.status(HttpStatusCode.OK).json({
        message: 'Ok /api/learn works',
    });
}

export const postLearn = (req: Request, res: Response) => {
    const { firstname, lastname } = req.body as {
        firstname: string;
        lastname: string;
    };
    // const name:string = req.body.firstname; --> isto kot gori
    // const lastName:string = req.body.lastname; --> isto kot gori
    // if (!('number' in req.query)) {
    //   res.status(500).json({
    //     message: `Nista`,
    //   });
    // }
    const number: number = +req.query.number!;
    const age: number = +req.query.age!;
    res.status(HttpStatusCode.OK).json({
        message: `Hello ${firstname} ${lastname}`,
        number: number,
        age: age,
    });
}