import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GetServiceHistoryPayload } from '@repo/types/api-responses'
import EditRecordForm from './editRecordForm'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { MdEdit } from 'react-icons/md'

export default function EditRecord({
  serviceDetails,
}: {
  serviceDetails: GetServiceHistoryPayload
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <MdEdit className="absolute left-2 bottom-1/2 hidden hover:cursor-pointer group-hover:block" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            <span>Customer id: </span>
            {serviceDetails.customer_id}
          </DialogDescription>
        </DialogHeader>
        <EditRecordForm serviceDetails={serviceDetails} />

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
