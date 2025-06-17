
export async function fetchAllUploads({ page }: { page: number }) {
  const endpoint = import.meta.env.VITE_API_URL
  const token = import.meta.env.VITE_API_SECRET_KEY

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token token=${token}`,
    },
  }

  let request = await fetch(`${endpoint}/api/v1/uploads/csv?page=${page || 1}`, requestOptions)

  return request.json()
}

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