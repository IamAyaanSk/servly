'use client'
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { updateServiceRequestHistoryZodSchema } from '@repo/data-validation/zod'
import { z } from 'zod'

export default function EditRecordForm({ customerId }: { customerId: string }) {
  const form = useForm<z.infer<typeof updateServiceRequestHistoryZodSchema>>({
    resolver: zodResolver(updateServiceRequestHistoryZodSchema),
    defaultValues: {
      username: '',
    },
  })
}
