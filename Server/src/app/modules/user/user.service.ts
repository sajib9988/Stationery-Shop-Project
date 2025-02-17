import { StatusCodes } from "http-status-codes";
import User from "./user.model";
import AppError from "../../utils/AppError";
import QueryBuilder from "../../builder/querybuilder";
const blockUser = async (userId: string, payload: { isBlocked: boolean }) => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }
  
    if (user.role === 'admin') {
      throw new AppError(StatusCodes.FORBIDDEN, 'Admin cannot be blocked');
    }
  
    const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true });
  
    if (!updatedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User not blocked! Try again later');
    }
  
    return updatedUser;
  };

  // **Get Users with QueryBuilder**
const getUsers = async (query: Record<string, unknown>) => {
    const searchableFields = ['name', 'email']; // Name এবং Email অনুসন্ধান করা যাবে
  
    const userQuery = new QueryBuilder(User.find(), query)
      .search(searchableFields)
      .filter()
      .sort()
      .paginate();
  
    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();
  
    return {
      meta,
      result,
    };
  };
  
  export const userService = {
    blockUser,
    getUsers,
  };
  