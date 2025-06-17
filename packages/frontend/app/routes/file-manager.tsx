import React from 'react'
import Lodash from 'lodash'
import { RefreshCcw } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import * as dateFns from 'date-fns'
import { useSearchParams } from 'react-router'

import { Button } from '@/components/ui/button'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Checkbox } from '@/components/ui/checkbox'
import { FileManagerProvider, useFileManager } from '@/context/file-manager'
import { fetchAllUploads } from '@/services'
import TablePagination from '@/components/molecules/table/pagination'
import ImportView from '@/components/molecules/import-view'
import RenderOrLoading from '@/components/molecules/table/render-or-loading'

export function FileManager() {
  const [params, _setSearchParams] = useSearchParams()
  const [_selected, setSelected] = React.useState([])
  const fileManager = useFileManager()

  const page = Number(params.get('page')) || 1

  const query: any = useQuery({
    queryKey: ['products', page, fileManager.refreshAt],
    queryFn: () => fetchAllUploads({ page }),
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
          <h1 className="text-2xl font-bold">File Manager</h1>
          <p className="text-gray-500 pt-1">Your uploaded files appeared here</p>
        </div>

        <div className="flex justify-end gap-2">
          {query.isFetched && (
            <>
              <TablePagination
                totalRows={query.data?.total_items || 0}
                totalPage={query.data?.total_page || 0}
                page={query.data?.page || 1}
                nextPage={query.data?.next_page || 0}
              />
            </>
          )}

          <ImportView />

          {query.isFetched && (
            <Button variant="outline" onClick={() => query.refetch()}>
              <RefreshCcw size={15} />
              Refresh
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox name="file_ids" onClick={handleSelectedAll} />
              </TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sended At</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>

          <RenderOrLoading
            errorMessage={query.error?.message || ''}
            isEmpty={query.data?.items.length === 0}
            isLoading={query.isPending || query.isFetching}
            isError={query.isError}
          >
            {Lodash.map(query.data?.items || [], (item: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox name={`file_ids[${item.id}]`} value={item.id} checked={false} />
                  </TableCell>
                  <TableCell>{item.file_name || '-'}</TableCell>
                  <TableCell>{item.file_size || '-'}</TableCell>
                  <TableCell>{item.file_type || '-'}</TableCell>
                  <TableCell>{item.file_status || '-'}</TableCell>
                  <TableCell>
                    {dateFns.formatDistanceToNow(item.created_at, { addSuffix: true }) || '-'}
                  </TableCell>
                  <TableCell>
                    {dateFns.formatDistanceToNow(item.updated_at, { addSuffix: true }) || '-'}
                  </TableCell>
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
              page={query.data?.page || 1}
              nextPage={query.data?.next_page || 0}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function FileManagerView() {
  return (
    <FileManagerProvider>
      <FileManager />
    </FileManagerProvider>
  )
}
