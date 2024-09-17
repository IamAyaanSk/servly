import { z } from 'zod'
import { ServiceType, ServiceStatus, ServiceProvider } from '@repo/db/enums'

export const updateServiceRequestHistoryZodSchema = z.object({
  serviceType: z
    .nativeEnum(ServiceType, {
      message: 'Please select a valid service type',
    })
    .optional(),

  description: z
    .string()
    .max(50, {
      message: 'Description should not be more than 50 characters.',
    })
    .optional(),

  amount: z
    .string()
    .regex(/^(0|[1-9]\d*)(\.\d+)?$/, {
      message: 'Invalid amount',
    })
    .optional(),

  status: z
    .nativeEnum(ServiceStatus, {
      message: 'Please select a valid status',
    })
    .optional(),

  paymentMethod: z
    .string()
    .max(20, {
      message: 'Payment method should not be more than 20 characters.',
    })
    .optional(),

  serviceProvider: z
    .nativeEnum(ServiceProvider, {
      message: 'Please select a valid service provider',
    })
    .optional(),

  fees: z
    .string()
    .regex(/^(0|[1-9]\d*)(\.\d+)?$/, {
      message: 'Invalid fees',
    })
    .optional(),
})

export const updateServiceHistoryParamsZODSchema = z.object({
  id: z.string().uuid({
    message: 'Please pass a valid service id',
  }),
})

export const serviceHistoryQueryZodSchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, { message: 'Page must be a number' })
    .transform(Number)
    .refine((val) => val > 0, { message: 'Page must be a positive number' }),
})

export const zod = z
