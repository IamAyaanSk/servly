import type { ColumnType } from 'kysely'
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

import type { ServiceType, ServiceProvider, ServiceStatus } from './enums'

export type ServiceHistory = {
  id: Generated<string>
  customer_id: string
  service_date: Timestamp
  service_type: ServiceType
  description: string
  amount: number
  status: ServiceStatus
  transaction_id: string
  payment_method: string
  service_provider: ServiceProvider
  account_id: string
  reference_id: string
  fees: number
  created_at: Generated<Timestamp>
  updated_at: Timestamp
}
export type DB = {
  service_history: ServiceHistory
}
