import { Types } from 'mongoose';

import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { ILoginUser, IUser } from './auth.interface';
import { createToken } from './auth.utils';

import config from '../../config';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import User from '../user/user.model';



type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};

const register = async (payload: IUser): Promise<UserPayload> => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      throw new AppError(httpStatus.CONFLICT, 'User already exists with this email');
    }

    const result = await User.create(payload);
    
    // Return only necessary fields
    return {
      _id: result._id,
      name: result.name,
      email: result.email
    };
  } catch (error) {

    
    if (error instanceof AppError) {
      throw error;
    }
    
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to register user'
    );
  }
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }


  const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password!');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES_IN as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string
  );

  return { accessToken, refreshToken, user };
};

const refreshToken = async (token: string, res: Response) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.JWT_REFRESH_SECRET as string) as JwtPayload;
  } catch {
    res.clearCookie("refreshToken");
    throw new AppError(httpStatus.UNAUTHORIZED, "Expired refresh token");
  }

  const { userId } = decoded;
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };

  const accessToken = createToken(jwtPayload, config.JWT_SECRET as string, config.JWT_EXPIRES_IN as string);
  const newRefreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET as string, config.JWT_REFRESH_EXPIRES_IN as string);

  // 🔥 Set new refresh token in cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  
  // console.log("Refresh Token Set in Cookie:", newRefreshToken)
  

  return accessToken;
};

const logout = async (res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return { message: 'Logged out successfully' };
};

const updatePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { userId } = userData;
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Please enter current password correctly'
    );
  }

  user.password = payload.newPassword;
  await user.save();
};

const updateProfile = async (userId: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

export const AuthService = {
  register,
  login,
  logout,
  refreshToken,
  updatePassword,
  updateProfile,
  getMe,
}; 