import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import User from '../modules/user/user.model';



const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      throw new AppError(401, 'You are not authorized!');
    }

    const extractedToken = token.split(' ')[1];
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await User.findOne({ email: decoded.email });
    // console.log('User fetched:', user);
    if (!user) {
      throw new AppError(404, 'User not found!');
 
    }
    // console.log('User found:', user);
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new AppError(403, 'You are not authorized to perform this action!');
    }
    req.user = user._id;

    next();
  });
};

export default auth;
