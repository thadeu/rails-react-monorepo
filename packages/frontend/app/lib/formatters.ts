import * as dateFns from 'date-fns'

export async function fetchAllProducts({ page }: { page: number }) {
  const endpoint = import.meta.env.VITE_API_URL
  const token = import.meta.env.VITE_API_SECRET_KEY

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token token=${token}`,
    },
  }

  let request = await fetch(`${endpoint}/api/v1/products?page=${page || 1}`, requestOptions)

  return request.json()
}

export function formatCurrency(num: number, currency: string = 'USD', options = {}): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, ...options }).format(
    num
  )
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function formatDatetime(date: string): string {
  let redate = new Date(date.replace(/^-/, '')).toDateString()

  try {
    return dateFns.format(redate, 'EE, MM/dd/yyyy HH:mm:ss')
  } catch {
    return date
  }
}