import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body, 'req.b');
   const verifyData= await schema.parseAsync({
      body: req.body,
    });
    req.body = verifyData.body;
    // console.log("req.a",req.body)
    next();
  });
};
export default validateRequest;