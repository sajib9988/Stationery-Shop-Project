import { Request, Response } from "express";
import { ProductService } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../utils/AppError";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.addProduct(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product added successfully",
    statusCode: StatusCodes.CREATED,
    data: product,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await ProductService.getAllProducts(filters);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Products retrieved successfully",
    statusCode: StatusCodes.OK,
    data: result.products,
    meta: { totalPage: result.totalPage },
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.getProductById(req.params.id);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product retrieved successfully",
    statusCode: StatusCodes.OK,
    data: product,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
  // console.log("Updated Product:", updatedProduct);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product updated successfully",
    statusCode: StatusCodes.OK,
    data: updatedProduct,
  });
});


const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await ProductService.deleteProduct(req.params.id);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted successfully",
    statusCode: StatusCodes.OK,
  });
});

export const ProductController = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
