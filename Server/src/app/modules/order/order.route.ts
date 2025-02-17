import express from 'express';
import { orderController } from './order.controller';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import { USER_ROLE } from '../auth/auth.interface';

const orderRoutes = express.Router();

// Route to verify payment (Admin only)
orderRoutes.patch(
  '/verify',
  auth(USER_ROLE.admin),
  orderController.verifyPayment,
);

// Route to get total revenue (Admin only)
orderRoutes.get(
  '/revenue',
  auth(USER_ROLE.admin),
  orderController.getTotalRevenue,
);

// Route to create a new order (Customer or Admin)
orderRoutes.post(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(orderValidation.orderValidationSchema),
  orderController.createOrder,
);

// Route to get orders (Customer or Admin)
orderRoutes.get(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.getOrders,
);

export default orderRoutes;