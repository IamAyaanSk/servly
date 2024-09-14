import { z } from 'zod'

const serviceTypeEnum = ['PAYMENT', 'LOAN', 'INVESTMENT'] as const
const serviceProviderEnum = [
  'BANK',
  'PAYMENT_GATEWAY',
  'FINTECH_PARTNER',
] as const

// Define the Zod schema for updating service request history
const updateServiceRequestHistorySchema = z.object({
  serviceDate: z
    .string()
    .datetime({
      message: 'Please enter date and time in a valid format',
    })
    .optional(),

  serviceType: z
    .enum(serviceTypeEnum, {
      message: 'Please select a valid service type',
    })
    .optional(),

  description: z.string().optional(),

  amount: z
    .number()
    .positive({ message: 'Amount must be a positive number' })
    .optional(),

  status: z.string().optional(),

  transactionId: z.string().optional(),

  paymentMethod: z.string().optional(),

  serviceProvider: z
    .enum(serviceProviderEnum, {
      message: 'Please select a valid service provider',
    })
    .optional(),

  accountId: z.string().optional(),

  referenceId: z.string().optional(),

  fees: z.number().optional(),
})

export const zod = z
export const updateServiceRequestHistoryZodSchema =
  updateServiceRequestHistorySchema
