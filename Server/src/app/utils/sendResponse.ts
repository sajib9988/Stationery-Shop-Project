import { Response } from 'express'
import { TSuccessResponse } from '../../interfaces/response'

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  })
}

export default sendResponse
