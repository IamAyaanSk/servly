type ErrorResponseMapKey = 'sevice/invalidId'

const errorResponseMap: Record<ErrorResponseMapKey, string> = {
  'sevice/invalidId': "The service you are looking for doesn't exists",
}

export { errorResponseMap }
