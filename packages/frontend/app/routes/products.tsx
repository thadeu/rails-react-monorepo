import React from 'react'
import Lodash from 'lodash'
import { RefreshCcw } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import type { Route } from './+types/_index'
import { useSearchParams } from 'react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency, formatDatetime, formatNumber } from '@/lib/formatters'

import { fetchAllProducts } from '@/services'
import TablePagination from '@/components/molecules/table/pagination'
import RenderOrLoading from '@/components/molecules/table/render-or-loading'
import ProductsFilters from '@/components/molecules/products-filters'

export default function Products({ loaderData }: Route.ComponentProps) {
  const [params, setSearchParams] = useSearchParams()
  const [selected, setSelected] = React.useState([])

  const page = Number(params.get('page')) || 1

  const query: any = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchAllProducts({ page }),
    refetchOnWindowFocus: false,
  })

  const handleSelectedAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.state == 'unchecked') {
      setSelected(query.data.items.map((item: any) => item.id))
    } else {
      setSelected([])
    }
  }

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center gap-2 py-2">
        <div className="flex flex-col flex-auto">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500 pt-1">Your products that was imported via CSV</p>
        </div>

        <div className="flex justify-end gap-2">
          {query.isFetched && (
            <>
              <TablePagination
                totalRows={query.data?.total_items || 0}
                totalPage={query.data?.total_page || 0}
                page={query.data?.page || 0}
                nextPage={query.data?.next_page || 0}
              />

              <Button variant="outline" onClick={() => query.refetch()}>
                <RefreshCcw size={15} />
                Refresh
              </Button>
            </>
          )}

          <ProductsFilters />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox name="product_ids" onClick={handleSelectedAll} />
              </TableHead>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>USD</TableHead>
              <TableHead>EUR</TableHead>
              <TableHead>BRL</TableHead>
              <TableHead>CAD</TableHead>
              <TableHead>BTC</TableHead>
              <TableHead>Expiration At</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>

          <RenderOrLoading
            isLoading={query.isPending || query.isFetching}
            isError={query.isError}
            isEmpty={query.data?.items.length === 0}
            errorMessage={query.error?.message || ''}
          >
            {Lodash.map(query.data?.items || [], (item: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      name={`product_ids[${item.id}]`}
                      value={item.id}
                      checked={false}
                    />
                  </TableCell>

                  <TableCell>
                    {page > 1 ? formatNumber((page - 1) * 1000 + index + 1) : index + 1}
                  </TableCell>

                  <TableCell>{Lodash.truncate(item.name, { length: 100 })}</TableCell>
                  <TableCell>{formatCurrency(item.price, 'USD')}</TableCell>
                  <TableCell>{formatCurrency(item.currencies.eur.price, 'EUR')}</TableCell>
                  <TableCell>{formatCurrency(item.currencies.brl.price, 'BRL')}</TableCell>
                  <TableCell>{formatCurrency(item.currencies.cad.price, 'CAD')}</TableCell>

                  <TableCell>
                    {formatCurrency(item.currencies.btc.price, 'BTC', {
                      minimumFractionDigits: 8,
                    })}
                  </TableCell>

                  <TableCell>{formatDatetime(item.expiration_at)}</TableCell>
                  <TableCell>{formatDatetime(item.updated_at)}</TableCell>
                </TableRow>
              )
            })}
          </RenderOrLoading>
        </Table>

        {query.isFetched && (
          <div className="flex justify-end my-4">
            <TablePagination
              totalRows={query.data?.total_items || 0}
              totalPage={query.data?.total_page || 0}
              page={query.data?.page || 0}
              nextPage={query.data?.next_page || 0}
            />
          </div>
        )}
      </div>
    </div>
  )
}
