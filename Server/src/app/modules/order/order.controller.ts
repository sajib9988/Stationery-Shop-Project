import { orderService } from './order.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../auth/auth.interface';


// create a controller for create o order
const createOrder = catchAsync(async (req, res) => {
  const user=req?.user as IUser;
  const payload = req.body;
  const result = await orderService.createOrder(user, payload, req.ip!);
  // console.log(result,"result")
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Order create successfully',
    statusCode: StatusCodes.OK,
    data:result,
  });
});
// get order 
const getOrders = catchAsync(async (req, res) => {
  const user=req?.user as IUser;
  const queryData = req?.query;
  // console.log("queryData",queryData)
  const result = await orderService.getOrders(user,queryData);
  // console.log(result,"result")
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Order get successfully',
    statusCode: StatusCodes.OK,
    data: result.result,
    meta:result.meta
  });
});
// verify payment controller 
const verifyPayment = catchAsync(async (req, res) => {
  const order_id= req?.body.order_id as string;
  const result = await orderService.verifyPayment(order_id as string);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'verify order successfully',
    statusCode: StatusCodes.OK,
    data: result,
   
  });
});
// create a controller for get total revenue
const getTotalRevenue = catchAsync(async (req, res) => {
  const result = await orderService.getTotalRevenue();
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'verify order successfully',
    statusCode: StatusCodes.OK,
    data: result,
   
  });
});


export const orderController = {
  createOrder,
  getTotalRevenue,
  getOrders,
  verifyPayment,
  
  
};