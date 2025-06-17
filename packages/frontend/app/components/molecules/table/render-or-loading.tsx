import { TableBody, TableCell, TableRow } from '@/components/ui/table'

export default function RenderOrLoading({
  isLoading,
  isError,
  isEmpty,
  errorMessage,
  children,
}: {
  isEmpty: boolean
  isLoading: boolean
  isError: boolean
  errorMessage: string
  children: React.ReactNode
}) {
  if (isEmpty) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={10} className="h-24">
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-2xl">No data found</h1>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={10} className="h-24">
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-2xl">An error has occurred: {errorMessage}</h1>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={10} className="h-24">
            <div className="flex items-center justify-start">
              <h1 className="font-bold text-1xl">Loading...</h1>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return <TableBody>{children}</TableBody>
}
