import { BaseQueryApi } from "@reduxjs/toolkit/query";

// ../types/type.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isBlocked: boolean; // Ensure this is spelled correctly (isBlocked)
  profileImage: string;
}
  
export type ApiResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    statusCode: number;
    success: boolean;
    message: string;
    };


    export type TError = {
        data: {
          message: string;
          stack: string;
          success: boolean;
        };
        status: number;
      };
      export type TResponse<T> = {
        data?: T;
        error?: TError;
        meta?: TMeta;
        statusCode: number;
        success: boolean;
        message: string;
      };
      export type TMeta = {
        limit: number;
        page: number;
        total: number;
        totalPage: number;
      };

      export interface IProduct {
        _id: string;
        image: string;
        name: string;
        category: string;
        price: number;
        inStock: boolean;
        description?: string;
        model?: string;
        brand?: string;
        quantity: number;
      }
      export interface IOrderResponse {
        _id: string;
        user: IUser;
        products: OrderItems;
        createdAt: string;
        updatedAt: string;
    }
    
    export type OrderItems = {
        quantity: number;
        product: IProduct;
    }[];
    
    export interface IOrder {
        _id: string;
        user: IUser;
        products: OrderItems;
        totalPrice: number;
        status: string;
        transaction: {
            id: string;
            status: string;
        };
        createdAt: string;
        updatedAt: string;
    }
    export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;