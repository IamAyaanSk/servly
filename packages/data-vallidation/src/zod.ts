import { z } from 'zod'

const serviceTypeEnum = ['PAYMENT', 'LOAN', 'INVESTMENT'] as const
const serviceProviderEnum = [
  'BANK',
  'PAYMENT_GATEWAY',
  'FINTECH_PROVIDER',
] as const
const statusEnum = ['COMPLETED', 'FAILED', 'PENDING'] as const

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

  description: z
    .string()
    .max(20, {
      message: 'Payment method should not be more than 12 characters.',
    })
    .optional(),

  amount: z
    .number()
    .positive({ message: 'Amount must be a positive number' })
    .optional(),

  status: z
    .enum(statusEnum, {
      message: 'Please select a valid status',
    })
    .optional(),

  paymentMethod: z
    .string()
    .max(12, {
      message: 'Payment method should not be more than 12 characters.',
    })
    .optional(),

  serviceProvider: z
    .enum(serviceProviderEnum, {
      message: 'Please select a valid service provider',
    })
    .optional(),

  fees: z.number().optional(),
})

export const zod = z
export const updateServiceRequestHistoryZodSchema =
  updateServiceRequestHistorySchema
