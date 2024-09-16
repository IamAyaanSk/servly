type SuccessResponseMapKey = 'service/fetch' | 'service/update'

const successResponseMap: Record<SuccessResponseMapKey, string> = {
  'service/fetch': 'Fetched service history successfully.',
  'service/update': 'Updated service history successfully.',
}

export { successResponseMap }
