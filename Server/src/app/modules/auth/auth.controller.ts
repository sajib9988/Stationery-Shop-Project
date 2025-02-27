import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../utils/AppError';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  // console.log("req.body",req.body)
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await AuthService.logout(res);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully',
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh token not found');
  }

  const result = await AuthService.refreshToken(refreshToken, res);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await AuthService.updateProfile(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {
  console.log(" controller:", req.user); // Debug log

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "All password fields are required");
  }
  console.log("req.user:", req.user);
  await AuthService.updatePassword(req.user as JwtPayload, { oldPassword, newPassword });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password updated successfully",
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const result = await AuthService.getMe(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const AuthController = {
  login,
  register,
  logout,
  refreshToken,
  updateProfile,
  updatePassword,
  getMe,
};