import React from 'react'
import { useForm } from 'react-hook-form'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type Inputs = {
  name: string
  price: string
  expiration_at: string
}

export default function ProductsFilters() {
  const form = useForm<Inputs>({
    defaultValues: {
      name: '',
      price: '',
      expiration_at: '',
    },
  })

  async function onSubmit(data: Inputs) {}

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <Filter className="mr-1 h-4 w-2" />
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>

          <SheetDescription>Filter your products easily.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Real file name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>

                    <FormControl>
                      <Input placeholder="Price" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiration_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration At</FormLabel>

                    <FormControl>
                      <Input placeholder="Expiration At" type="datetime-local" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-6 items-center">
                <div className="flex gap-2">
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
