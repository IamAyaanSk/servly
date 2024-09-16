import { GetServiceHistoryResponse } from '@repo/common-types/api-responses'
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized'
import { GetServiceHistoryPayload } from '@repo/common-types/api-responses'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import timestampFormatter from '@/utils/timestampFormatter'
import EditRecord from '@/components/editRecord'

export default function VirtualizedTable({
  data,
}: {
  data: GetServiceHistoryResponse
}) {
  if (!data.response.payload) {
    return <h2>No records in db</h2>
  }
  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    const serviceDetails: GetServiceHistoryPayload | undefined =
      data.response.payload[index]
    if (!serviceDetails) return
    return (
      <TableRow
        key={key}
        style={style}
        className="text-xs text-gray-600 relative group"
      >
        <TableCell className="min-w-[225px] max-w-[225px] pr-3 pl-8">
          <span className="">{serviceDetails.customer_id}</span>
        </TableCell>
        <TableCell className="min-w-[100px] max-w-[100px] pl-0 pr-3">
          <span>{serviceDetails.service_type}</span>
        </TableCell>
        <TableCell className="min-w-[260px] max-w-[260px] pl-0 pr-3 whitespace-pre-wrap">
          <span>{serviceDetails.description}</span>
        </TableCell>
        <TableCell className="min-w-[135px] max-w-[135px] pl-0 pr-3">
          <span
            className={`py-1 px-2 rounded-xl ${
              serviceDetails.status === 'COMPLETED'
                ? 'bg-green-100'
                : serviceDetails.status === 'PENDING'
                  ? 'bg-blue-100'
                  : 'bg-red-100'
            }`}
          >
            {serviceDetails.status}
          </span>
        </TableCell>
        <TableCell className="min-w-[250px] max-w-[250px] pl-0 pr-3">
          <span>
            {timestampFormatter(serviceDetails?.service_date.toLocaleString())}
          </span>
        </TableCell>
        <TableCell className="min-w-[225px] max-w-[225px] pl-0 pr-3">
          <span>{serviceDetails.transaction_id}</span>
        </TableCell>
        <TableCell className="min-w-[150px] max-w-[150px] pl-0 pr-3">
          <span>{serviceDetails.payment_method}</span>
        </TableCell>
        <TableCell className="min-w-[100px] max-w-[100px] pl-0 pr-3">
          <span>₹ {serviceDetails.amount}</span>
        </TableCell>
        <TableCell className="min-w-[100px] max-w-[100px] pl-0 pr-3">
          <span>₹ {serviceDetails.fees}</span>
        </TableCell>
        <TableCell className="min-w-[150px] max-w-[150px] pl-0 pr-3">
          <span>{serviceDetails.service_provider}</span>
        </TableCell>
        <TableCell className="min-w-[125px] max-w-[125px] pl-0 pr-3">
          <span>{serviceDetails.account_id}</span>
        </TableCell>
        <TableCell className="min-w-[125px] max-w-[125px] pl-0 pr-3">
          <span>{serviceDetails.reference_id}</span>
        </TableCell>
        <EditRecord serviceDetails={serviceDetails} />
      </TableRow>
    )
  }

  return (
    <div className="w-full h-full">
      <Table className="overflow-clip h-full">
        <TableHeader className="border-b-2">
          <TableRow className="text-sm">
            <TableHead className="min-w-[225px] max-w-[225px] pr-0 pl-8">
              Customer Id
            </TableHead>

            <TableHead className="min-w-[100px] max-w-[100px] pl-0">
              Type
            </TableHead>
            <TableHead className="min-w-[260px] max-w-[260px] pl-0">
              Description
            </TableHead>
            <TableHead className="min-w-[135px] max-w-[135px] pl-0">
              Status
            </TableHead>
            <TableHead className="min-w-[250px] max-w-[250px] pl-0">
              Date
            </TableHead>
            <TableHead className="min-w-[225px] max-w-[225px] pl-0">
              Transaction Id
            </TableHead>
            <TableHead className="min-w-[150px] max-w-[150px] pl-0">
              Payment Method
            </TableHead>
            <TableHead className="min-w-[100px] max-w-[100px] pl-0">
              Amount
            </TableHead>
            <TableHead className="min-w-[100px] max-w-[100px] pl-0">
              Fees
            </TableHead>
            <TableHead className="min-w-[150px] max-w-[150px] pl-0">
              Provider
            </TableHead>
            <TableHead className="min-w-[125px] max-w-[125px] pl-0">
              Account Id
            </TableHead>
            <TableHead className="min-w-[125px] max-w-[125px] pl-0">
              Reference Id
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[400px] w-full ">
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={data.response.payload.length}
                rowHeight={60}
                rowRenderer={rowRenderer}
                overscanRowCount={5}
              />
            )}
          </AutoSizer>
        </TableBody>
      </Table>
    </div>
  )
}
