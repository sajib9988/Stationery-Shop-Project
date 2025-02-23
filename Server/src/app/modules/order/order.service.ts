/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import User from '../user/user.model';
import Order from './order.model';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../product/product.model';
import { orderUtils } from './order-utils';
import QueryBuilder from '../../builder/querybuilder';
import AppError from '../../utils/AppError';
import { IUser } from '../auth/auth.interface';

// create this service for create a order
const createOrder = async (
  user: IUser,
  payload: { products: { _id: string; quantity: number }[] },
  client_ip: string,
) => {
  const id = user?.userId;
  const userData = await User.findById(id);
  if (!payload?.products?.length)
    throw new AppError(403, 'Order is not specified');

  const products = payload?.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item._id);
      if (product) {
        const subtotal = product ? (product?.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  const transformedProducts: any[] = [];

  productDetails.forEach((product) => {
    transformedProducts.push({
      product: product?._id,
      quantity: product?.quantity,
    });
  });

  let order = await Order.create({
    user: id,
    products: transformedProducts,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: userData?.name,
    customer_address: userData?.address,
    customer_email: userData?.email,
    customer_phone: userData?.phone,
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  // console.log(payment, 'payment');
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};
// get orders
const getOrders = async (
  user: IUser,
  query: Record<string, unknown>,
) => {
  const searchableFields = [
    'model',
    'description',
    'category',
    'brand',
    'name',
  ];

  if (user?.role === 'admin') {
    const orderQuery = new QueryBuilder(
      Order.find().populate('user products.product'),
      query,
    )
      .search(searchableFields)
      .filter()
      .sort()
      .paginate();

    const result = await orderQuery.modelQuery;
    const meta = await orderQuery.countTotal();
    return {
      meta,
      result,
    };
  }

  const orderQuery = new QueryBuilder(
    Order.find({ user: user.userId }).populate('user products.product'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await orderQuery.modelQuery;
  console.log(result, 'result');
  const meta = await orderQuery.countTotal();
  return {
    meta,
    result,
  };
};
// verify payme service
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment[0]?.customer_order_id) {
    const findOrder = await Order.findById(
      verifiedPayment[0]?.customer_order_id,
    );
    console.log("finf", findOrder.products)
    for (const item of findOrder?.products as {
      product: Types.ObjectId;
      quantity: number;
    }[]) {
      const bike = await Product.findById(item.product);
      if (!bike || bike.quantity < item.quantity) {
        throw new AppError(StatusCodes.CONFLICT,`Not enough stock for ${bike?.name}`);
      }
console.log("bike",bike)
      bike.quantity -= item.quantity;
      if (bike.quantity === 0) {
        bike.inStock = false;
      }

      await bike.save();
    }

   
  }
  if (verifiedPayment.length) {
      await Order.findOneAndUpdate(
          {
              "transaction.id": order_id,
          },
          {
              "transaction.bank_status": verifiedPayment[0].bank_status,
              "transaction.sp_code": verifiedPayment[0].sp_code,
              "transaction.sp_message": verifiedPayment[0].sp_message,
              "transaction.transactionStatus": verifiedPayment[0].transaction_status,
              "transaction.method": verifiedPayment[0].method,
              "transaction.date_time": verifiedPayment[0].date_time,
              status:
                  verifiedPayment[0].bank_status == "Success"
                      ? "Paid"
                      : verifiedPayment[0].bank_status == "Failed"
                          ? "Pending"
                          : verifiedPayment[0].bank_status == "Cancel"
                              ? "Cancelled"
                              : "",
          },
          {new :true}
      );
    //  console.log(res,order_id,"res")
  }

  return verifiedPayment;
};
// create this service for get total revenue
const getTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        // Grouping by null will aggregate all documents
        _id: null,
        // Sum the totalPrice field across all orders
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        // Include only totalRevenue in the result
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  if (result.length === 0) {
    return { totalRevenue: 0 };
  }

  return result[0];
};
export const orderService = {
  createOrder,
  getTotalRevenue,
  getOrders,
  verifyPayment,
};