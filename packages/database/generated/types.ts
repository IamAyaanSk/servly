import type { ColumnType } from 'kysely'
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

import type { ServiceType, ServiceProvider } from './enums'

export type ServiceHistory = {
  id: Generated<number>
  customerId: string
  serviceDate: Timestamp
  serviceType: ServiceType
  description: string
  amount: number
  status: string
  transactionId: string
  paymentMethod: string
  serviceProvider: ServiceProvider
  accountId: string
  referenceId: string
  fees: number
  createdAt: Generated<Timestamp>
  updatedAt: Timestamp
}
export type DB = {
  service_history: ServiceHistory
}
