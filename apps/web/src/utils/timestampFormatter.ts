function timestampFormatter(timestamp: string): string {
  const date = new Date(timestamp)
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return formatter.format(date)
}

export default timestampFormatter
