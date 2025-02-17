import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';

// **Block/Unblock User (Only Admin)**
const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;

  const result = await userService.blockUser(userId, body);
  res.status(StatusCodes.OK).json({
    success: true,
    message: body.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
    data: result,
  });
});

// **Get All Users with QueryBuilder**
const getUsers = catchAsync(async (req, res) => {
  const queryData = req.query;
  const result = await userService.getUsers(queryData);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Users retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

export const userController = {
  blockUser,
  getUsers,
};
