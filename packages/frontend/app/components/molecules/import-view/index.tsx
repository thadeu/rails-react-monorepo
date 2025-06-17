import React from 'react'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'
import Lodash from 'lodash'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useFileManager } from '@/context/file-manager'

import { Input } from '@/components/ui/input'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { SimpleWebCSV, UploadService, readCsvFromFileSystem } from '@/common/csv'

type Inputs = {
  file_name: string
  file_size: string
  file_type: string
  file_csv: string
  file_raw?: any
}

export default function ImportView() {
  const form = useForm<Inputs>({
    defaultValues: {
      file_name: '',
      file_size: '',
      file_type: '',
      file_csv: '',
      file_raw: null,
    },
  })

  const timeoutRef = React.useRef<any>(null)
  const fileManager = useFileManager()

  const [progress, setProgress] = React.useState<number>(0)
  const [sheetStatus, setSheetStatus] = React.useState<boolean>(false)

  function handleCsvChange(evt: any) {
    setProgress(0)

    let file = evt.target.files[0]

    readCsvFromFileSystem(file).then(csv => {
      form.setValue('file_csv', csv as string)
    })

    form.setValue('file_name', file.name)
    form.setValue('file_size', file.size)
    form.setValue('file_type', file.type)
  }

  async function onSubmit(data: Inputs) {
    const service = new UploadService()
    const webCsv = new SimpleWebCSV(data.file_csv)

    const { header, rows } = webCsv.parse()
    const chunks = Lodash.chunk(rows, 1_000)

    const encryptKey = nanoid()
    const requests = new Map()
    const totalChunks = chunks.length

    for (let csvPart of chunks) {
      let count = requests.get(encryptKey) || 1

      const body = {
        file_name: data.file_name,
        file_size: data.file_size,
        file_type: data.file_type,
        file_chunk: webCsv.create(header, csvPart),
        file_encrypt_key: encryptKey,
        file_status: count >= totalChunks ? 'finished' : 'importing',
      }

      try {
        await service.sendRequest(body)
        requests.set(body.file_encrypt_key, ++count)

        let percent = totalChunks > 1 ? count / totalChunks : 1
        percent = Number((percent * 100).toFixed(0))

        if (percent > 0 && percent <= 100) {
          setProgress(percent)
        }
      } catch (error) {
        console.error(error)
      }
    }

    timeoutRef.current = setTimeout(() => {
      setSheetStatus(false)
      fileManager.setRefreshAt(new Date().toISOString())
    }, 5000)
  }

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <Sheet open={sheetStatus} onOpenChange={setSheetStatus}>
      <SheetTrigger asChild onClick={() => setSheetStatus(true)}>
        <Button variant="default">
          <Upload className="mr-1 h-4 w-2" />
          Import CSV File
        </Button>
      </SheetTrigger>

      <SheetContent
        onInteractOutside={() => {
          if (sheetStatus) {
            setSheetStatus(false)
            return true
          }

          return false
        }}
      >
        <SheetHeader>
          <SheetTitle>Fastest CSV Import</SheetTitle>

          <SheetDescription>
            Upload your file and import your products easily.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="file_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Real file name" readOnly={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File Size</FormLabel>

                    <FormControl>
                      <Input placeholder="Size in bytes" readOnly={true} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file_raw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CSV File</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Choose your file"
                        type="file"
                        {...field}
                        onChange={handleCsvChange}
                      />
                    </FormControl>

                    <FormDescription>
                      Please wait the upload finish, before close the modal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-6 items-center">
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={
                      !sheetStatus ||
                      form.formState.isSubmitting ||
                      form.formState.isDirty ||
                      !form.formState.isValid
                    }
                  >
                    Submit
                  </Button>

                  <Button
                    type="submit"
                    variant="outline"
                    onClick={() => setSheetStatus(false)}
                    disabled={
                      !sheetStatus ||
                      form.formState.isSubmitting ||
                      form.formState.isDirty ||
                      !form.formState.isValid
                    }
                  >
                    Close
                  </Button>
                </div>

                {progress > 0 && <div className={'text-sm font-bold'}>{progress}%</div>}
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
