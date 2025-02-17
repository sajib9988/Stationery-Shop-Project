export type TSuccessResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}; 




