export const ServiceType = {
  PAYMENT: 'PAYMENT',
  LOAN: 'LOAN',
  INVESTMENT: 'INVESTMENT',
} as const
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]
export const ServiceProvider = {
  BANK: 'BANK',
  PAYMENT_GATEWAY: 'PAYMENT_GATEWAY',
  FINTECH_PARTNER: 'FINTECH_PARTNER',
} as const
export type ServiceProvider =
  (typeof ServiceProvider)[keyof typeof ServiceProvider]
export const ServiceStatus = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
} as const
export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]
