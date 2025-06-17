import { useNavigate } from 'react-router'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '../../ui/pagination'

export default function TablePagination({
  totalRows,
  totalPage,
  page,
  nextPage,
}: {
  totalRows: number
  totalPage: number
  page: number
  nextPage: number
}) {
  const navigate = useNavigate()
  const countPages = nextPage ? totalPage * page : totalRows

  return (
    <div className="flex">
      <div className="flex items-center px-4 text-gray-500 w-full">
        <span className="text-sm">
          {countPages} of {totalRows}
        </span>
      </div>

      {nextPage > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1}`} />
            </PaginationItem>

            {page > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink href={`?page=1`}>1</PaginationLink>
                </PaginationItem>
              </>
            )}

            {page > 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationLink href={`?page=${page}`}>{page}</PaginationLink>
            </PaginationItem>

            {nextPage > 0 && (
              <>
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${nextPage}`}
                    onClick={() => navigate(`?page=${nextPage}`)}
                  />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
