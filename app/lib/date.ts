export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-GB',
) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  })
}
