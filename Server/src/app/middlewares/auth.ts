import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log("🔍 Incoming Request Headers:", req.headers);

    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      // console.error("❌ No token provided or invalid format");
      throw new AppError(401, 'You are not authorized!');
    }

    const extractedToken = token.split(' ')[1];
    // console.log("🔑 Extracted Token:", extractedToken);

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(extractedToken, process.env.JWT_SECRET as string) as JwtPayload;
      // console.log("✅ Decoded JWT:", decoded);
    } catch (error) {
      // console.error("❌ JWT Verification Failed:", error.message);
      throw new AppError(401, "Invalid or expired token!");
    }

    if (!decoded.email) {
      // console.error("❌ JWT Missing Email Field");
      throw new AppError(400, "Token is invalid: email missing!");
    }

    // console.log("🔍 Searching user with email:", decoded.email);

    const user = await User.findOne({ email: decoded.email.trim().toLowerCase() });
    // console.log("👤 User Fetched from DB:", user);

    if (!user) {
      // console.error("❌ User not found for email:", decoded.email);
      throw new AppError(404, 'User not found!');
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      // console.error("⛔ Unauthorized Role:", user.role);
      // console.log("✅ Allowed Roles:", requiredRoles);
      throw new AppError(403, 'You are not authorized to perform this action!');
    }

    // console.log("✅ User Authenticated Successfully:", user.email);
    req.user = decoded;

    next();
  });
};

export default auth;
