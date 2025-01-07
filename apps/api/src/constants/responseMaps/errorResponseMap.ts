type ErrorResponseMapKey =
  | 'service/invalidId'
  | 'service/failToFetch'
  | 'service/failToUpdate'
  | 'server/defaultInternalError'
  | 'service/defaultErrorStack'
  | 'service/rateLimit'

const errorResponseMap: Record<ErrorResponseMapKey, string> = {
  'service/invalidId': "The service you are looking for doesn't exists.",
  'service/failToFetch': 'Failed to fetch service historry.',
  'service/failToUpdate': 'Failed to update service history.',
  'server/defaultInternalError': 'Internal server error.',
  'service/defaultErrorStack': 'No error stack available.',
  'service/rateLimit':
    'Rate limit exceeded. Please wait before making more requests.',
}

export { errorResponseMap }
