import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

import type { Route } from './+types/_index'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber } from '@/lib/formatters'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CSV Importer' },
    { name: 'description', content: 'Importer your CSV file easily' },
  ]
}

async function fetchSummary() {
  const endpoint = import.meta.env.VITE_API_URL
  const token = import.meta.env.VITE_API_SECRET_KEY

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token token=${token}`,
    },
  }

  let request = await fetch(`${endpoint}/api/v1/summary`, requestOptions)

  return request.json()
}

export default function Home() {
  const query: any = useQuery({
    queryKey: ['summary'],
    queryFn: () => fetchSummary(),
    refetchOnWindowFocus: false,
    initialData: {
      total_uploads: 0,
      total_products: 0,
      evaluated_products: 0,
    },
  })

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-1 flex-col px-4 py-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 pt-1">Metrics about your products and uploads</p>
      </div>

      <div className="py-2" />

      <div className="grid md:grid-cols-5 gap-4 w-full py-2 px-2">
        <Card
          className={cn(['@container/card', query.isFetching ? 'bg-gray-100' : 'bg-white'])}
        >
          <CardHeader className="relative">
            <CardDescription>Total Uploads</CardDescription>

            <CardTitle
              className={cn(['@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'])}
            >
              {query.isFetched ? formatNumber(query.data?.total_uploads || 0) : '...'}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card
          className={cn(['@container/card', query.isFetching ? 'bg-gray-100' : 'bg-white'])}
        >
          <CardHeader className="relative">
            <CardDescription>Total Products</CardDescription>

            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {query.isFetched ? formatNumber(query.data?.total_products || 0) : '...'}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card
          className={cn(['@container/card', query.isFetching ? 'bg-gray-100' : 'bg-white'])}
        >
          <CardHeader className="relative">
            <CardDescription>Sum of total prices</CardDescription>

            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {query.isFetched ? formatCurrency(query.data?.evaluated_products || 0) : '...'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
