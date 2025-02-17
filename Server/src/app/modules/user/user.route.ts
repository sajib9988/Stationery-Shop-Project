import { Router } from 'express';

import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get('/all-users', auth('admin'), userController.getUsers);
userRouter.patch('/users/:userId/block', auth('admin'), userController.blockUser);

export default userRouter;
