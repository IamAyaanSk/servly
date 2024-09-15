import { ServiceHistory } from '@repo/db/generated/types'

export type GetServiceHistoryPayload = Omit<
  ServiceHistory,
  'created_at' | 'updated_at'
>

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
