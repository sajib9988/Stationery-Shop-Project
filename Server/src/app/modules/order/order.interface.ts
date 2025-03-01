import { Types } from 'mongoose'

export interface IOrder {
  user?: string
  products: {
    product: Types.ObjectId
    quantity: number
  }[]
  totalPrice?: number
  status?: 'Pending' | 'Delivered' | 'Cancelled'
  transaction?: {
    id?: string
    transactionStatus?: string
    bank_status?: string
    sp_code?: string
    sp_message?: string
    method?: string
    date_time?: string
  }
}

export type TProductData = {
  product: Types.ObjectId
  quantity: number
}
