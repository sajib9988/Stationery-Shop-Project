import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    image: { type: String },
    model: { type: String },
    description: { type: String },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
