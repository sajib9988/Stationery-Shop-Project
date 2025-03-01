import { Schema, model } from 'mongoose'
import { IOrder } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Ensure this matches your actual Product model name
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1']
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: false
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    transaction: {
      type: {
        id: { type: String },
        transactionStatus: { type: String },
        bank_status: { type: String },
        sp_code: { type: String },
        sp_message: { type: String },
        method: { type: String },
        date_time: { type: String }
      },
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const Order = model<IOrder>('Order', orderSchema)
// console.log(Order);
export default Order
