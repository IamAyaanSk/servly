type ErrorResponseMapKey = 'service/invalidId'

const errorResponseMap: Record<ErrorResponseMapKey, string> = {
  'service/invalidId': "The service you are looking for doesn't exists",
}

export { errorResponseMap }
