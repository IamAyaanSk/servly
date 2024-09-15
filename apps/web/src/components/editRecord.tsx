import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MdEdit } from 'react-icons/md'

export default function EditRecord({ customerId }: { customerId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MdEdit className="absolute left-2 bottom-1/2 hidden hover:cursor-pointer group-hover:block" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            <span className="text-neutral-600">Customer Id: </span>
            <span className="text-xs text-neutral-500">{customerId}</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
