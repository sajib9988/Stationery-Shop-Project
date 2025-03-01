import { z } from 'zod'

const orderValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product: z.string(),
        quantity: z.number()
      })
    )
  })
})

export const orderValidation = {
  orderValidationSchema
}
