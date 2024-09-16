import {
  ServiceProvider,
  ServiceStatus,
  ServiceType,
} from '@repo/db/generated/enums'
import { Generated, Timestamp } from '@repo/db/generated/types'

export interface GetServiceHistoryPayload {
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
}

export interface GetServiceHistoryResponse {
  status: ApiResponseStatus.success
  response: {
    totalResults: number
    totalPages: number
    payload: GetServiceHistoryPayload[]
  }
}

export interface UpdateServiceHistoryResponse {
  status: ApiResponseStatus.success
  response: string
}

export enum ApiResponseStatus {
  success = 'success',
  error = 'error',
}

export interface ErrorResponse {
  status: ApiResponseStatus.error
  response: string
  detail: string
}
