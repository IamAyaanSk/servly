import { ServiceHistory } from '@repo/db/generated/types'

export interface GetServiceHistoryResponse {
  status: ApiResponseStatus.success
  response: {
    totalResults: number
    totalPages: number
    data: ServiceHistory[]
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
