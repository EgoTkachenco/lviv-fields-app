import { format } from 'date-fns'

export const formatDate = (value) => {
  const date = new Date(value)
  if (date.toString() === 'Invalid Date') return ''
  return format(date, 'dd/MM/yyyy')
}
