import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import User from '../user/user.model';
import { USER_ROLE } from './auth.interface';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
);

router.post(
  '/register',
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.register
);

router.post('/logout', auth(), AuthController.logout);

router.post('/refresh-token', AuthController.refreshToken); // Add this line

router.patch(
  '/update-profile',
  auth(),
  validateRequest(AuthValidation.updateProfileZodSchema),
  AuthController.updateProfile
);

router.patch(
  '/update-password',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(AuthValidation.updatePasswordZodSchema),
  AuthController.updatePassword
);

router.get('/me', auth(), AuthController.getMe);

export const AuthRoutes = router;