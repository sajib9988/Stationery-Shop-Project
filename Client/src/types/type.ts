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
  
export type TResponseRedux<T> = {
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
      
      export type TMeta = {
        limit: number;
        page: number;
        total: number;
        totalPage: number;
      };