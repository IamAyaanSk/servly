'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { updateServiceRequestHistoryZodSchema } from '@repo/data-validation/zod'
import { z } from 'zod'
import { GetServiceHistoryPayload } from '@repo/common-types/api-responses'
import { Loader2 } from 'lucide-react'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { CurrentTablePageContext } from '@/contexts/currentTablePage'
import { useContext, useEffect } from 'react'
import { Button } from './ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Textarea } from './ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { SERVER_URL } from '@/constants/global'

export default function EditRecordForm({
  serviceDetails,
}: {
  serviceDetails: GetServiceHistoryPayload
}) {
  const queryClient = useQueryClient()
  const currentTablePage = useContext(CurrentTablePageContext)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof updateServiceRequestHistoryZodSchema>>({
    resolver: zodResolver(updateServiceRequestHistoryZodSchema),
    defaultValues: {
      paymentMethod: serviceDetails.payment_method,
      serviceProvider: serviceDetails.service_provider,
      serviceType: serviceDetails.service_type,
      status: serviceDetails.status,
      amount: serviceDetails.amount,
      fees: serviceDetails.fees,
      description: serviceDetails.description,
    },
  })

  const updateService = useMutation({
    mutationFn: (
      updatedServiceData: z.infer<typeof updateServiceRequestHistoryZodSchema>
    ) => {
      return axios.post(
        `${SERVER_URL}/services/${serviceDetails.id}?page=${currentTablePage}`,
        updatedServiceData
      )
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-service-history', currentTablePage],
      })
    },
  })

  function onSubmit(
    values: z.infer<typeof updateServiceRequestHistoryZodSchema>
  ) {
    updateService.mutate(values)

    console.log(values)
  }

  useEffect(() => {
    if (updateService.isSuccess) {
      toast({
        title: 'Record updated Successfully.',
      })
    }

    if (updateService.isError) {
      toast({
        variant: 'destructive',
        title: 'Failed to update record.',
      })
    }
  }, [updateService.isSuccess, updateService.isError])

  return (
    <>
      {updateService.isSuccess ? (
        <h2 className="py-6 px-4 text-xl font-semibold">Record Edited 🙌🏻</h2>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="updateServiceForm"
            className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs"
          >
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Payment method</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FINTECH_PARTNER">
                        Fintech Partner
                      </SelectItem>
                      <SelectItem value="PAYMENT_GATEWAY">
                        Payment Gateway
                      </SelectItem>
                      <SelectItem value="BANK">Bank</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INVESTMENT">Investment</SelectItem>
                      <SelectItem value="PAYMENT">Payment</SelectItem>
                      <SelectItem value="LOAN">Loan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="col-span-2 max-w-32">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COMPLETED">
                        {' '}
                        <span className="bg-green-100 py-[2px] rounded-lg px-2">
                          Completed
                        </span>
                      </SelectItem>
                      <SelectItem value="PENDING">
                        <span className="bg-blue-100 py-[2px] rounded-lg px-2">
                          Pending
                        </span>
                      </SelectItem>
                      <SelectItem value="FAILED">
                        {' '}
                        <span className="bg-red-100 py-[2px] rounded-lg px-2">
                          Failed
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl className="relative">
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fees (₹)</FormLabel>
                  <FormControl className="relative">
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your description here."
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Add description for service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {updateService.isIdle ? (
              <Button>Submit</Button>
            ) : updateService.isPending ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button disabled variant="destructive">
                An error occurred
              </Button>
            )}
          </form>
        </Form>
      )}
    </>
  )
}
