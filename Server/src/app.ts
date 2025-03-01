import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRouter from './app/modules/user/user.route'
import { AuthRoutes } from './app/modules/auth/auth.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { ProductRoutes } from './app/modules/product/product.route'
import orderRoutes from './app/modules/order/order.route'

const app = express()

// Middleware - order is important
app.use(cors({ 
  origin: 'https://stationery-shop-project-phi.vercel.app',
  credentials: true 
}));



app.use(cookieParser());
app.use(express.json());

// API Routes
app.use('/api/auth', AuthRoutes)
app.use('/api/admin', userRouter)
app.use("/api/products", ProductRoutes);
app.use('/api/orders',orderRoutes)

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

// Global Error Handler
app.use(globalErrorHandler)

// Handle Undefined Routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  }) 
})

export default app
