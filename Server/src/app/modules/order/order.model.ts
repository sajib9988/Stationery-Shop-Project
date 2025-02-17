import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Ensure this matches your actual Product model name
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [1, 'Total price cannot be less than 1'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: { type: String },
      transactionStatus: { type: String },
      bank_status: { type: String },
      sp_code: { type: String },
      sp_message: { type: String },
      method: { type: String },
      date_time: { type: String },
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Order = model<IOrder>('Order', orderSchema);
// console.log(Order);
export default Order;
