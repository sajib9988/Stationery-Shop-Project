import { Product } from "./product.model";
import { IProduct } from "./product.interface";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const addProduct = async (productData: IProduct) => {
  return await Product.create(productData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProducts = async (filters: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (filters.searchTerm) {
    query.$or = [
      { name: { $regex: filters.searchTerm, $options: "i" } },
      { category: { $regex: filters.searchTerm, $options: "i" } },
    ];
  }

  if (filters.category) query.category = filters.category;
  if (filters.inStock) query.inStock = filters.inStock === "true";
  if (filters.minPrice) query.price = { ...query.price, $gte: +filters.minPrice };
  if (filters.maxPrice) query.price = { ...query.price, $lte: +filters.maxPrice };

  const limit = parseInt(filters.limit) || 10;
  const page = parseInt(filters.page) || 1;
  const skip = (page - 1) * limit;

  const products = await Product.find(query).skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments(query);
  const totalPage = Math.ceil(totalProducts / limit);

  return { products, totalPage };
};

const getProductById = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return product;
};

const updateProduct = async (productId: string, productData: IProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
  if (!updatedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return updatedProduct;
};









const deleteProduct = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return deletedProduct;
};

export const ProductService = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
