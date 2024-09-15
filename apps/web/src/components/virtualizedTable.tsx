'use client'

import { GetServiceHistoryResponse } from '@repo/types/api-responses'
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized'
import { GetServiceHistoryPayload } from '@repo/types/api-responses'
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
    return (
      <TableRow
        key={key}
        style={style}
        className="text-xs text-gray-600 relative group"
      >
        <TableCell className="min-w-[240px] pr-3 pl-8">
          <span>{serviceDetails?.customerId}</span>
        </TableCell>
        <TableCell className="min-w-[80px] pl-0 pr-3">
          <span>{serviceDetails?.serviceType}</span>
        </TableCell>
        <TableCell className="min-w-[200px] pl-0 pr-3">
          <span>{serviceDetails?.description}</span>
        </TableCell>
        <TableCell className="min-w-[125px] pl-0 pr-3">
          <span
            className={`py-1 px-2 rounded-xl ${serviceDetails?.status === 'Completed' ? ' bg-green-100' : 'bg-red-100'}`}
          >
            {serviceDetails?.status}
          </span>
        </TableCell>
        <TableCell className="min-w-[230px] pl-0 pr-3">
          <span>
            {timestampFormatter(serviceDetails?.serviceDate.toString())}
          </span>
        </TableCell>
        <TableCell className="min-w-[130px] pl-0 pr-3">
          <span>{serviceDetails?.transactionId}</span>
        </TableCell>
        <TableCell className="min-w-[150px] pl-0 pr-3">
          <span>{serviceDetails?.paymentMethod}</span>
        </TableCell>
        <TableCell className="min-w-[100px] pl-0 pr-3">
          <span>₹ {serviceDetails?.amount}</span>
        </TableCell>
        <TableCell className="min-w-[100px] pl-0 pr-3">
          <span>₹ {serviceDetails?.fees}</span>
        </TableCell>
        <TableCell className="min-w-[100px] pl-0 pr-3">
          <span>{serviceDetails?.serviceProvider}</span>
        </TableCell>
        <TableCell className="min-w-[130px] pl-0 pr-3">
          <span>{serviceDetails?.accountId}</span>
        </TableCell>
        <TableCell className="min-w-[130px] pl-0 pr-3">
          <span>{serviceDetails?.referenceId}</span>
        </TableCell>
        <EditRecord customerId={serviceDetails?.customerId} />
      </TableRow>
    )
  }

  return (
    <div className="w-full h-full">
      <Table className="overflow-clip h-full">
        <TableHeader className="border-b-2">
          <TableRow className="text-sm">
            <TableHead className="min-w-[240px] max-w-52 pr-0 pl-8">
              Customer Id
            </TableHead>

            <TableHead className="min-w-[80px] max-w-32 pl-0">Type</TableHead>
            <TableHead className="min-w-[200px] max-w-52 pl-0">
              Description
            </TableHead>
            <TableHead className="min-w-[125px] max-w-32 pl-0">
              Status
            </TableHead>
            <TableHead className="min-w-[230px] max-w-56 pl-0">Date</TableHead>
            <TableHead className="min-w-[130px] max-w-32 pl-0">
              Transaction Id
            </TableHead>
            <TableHead className="min-w-[150px] max-w-52 pl-0">
              Payment Method
            </TableHead>
            <TableHead className="min-w-[100px] max-w-28 pl-0">
              Amount
            </TableHead>
            <TableHead className="min-w-[100px] max-w-24 pl-0">Fees</TableHead>
            <TableHead className="min-w-[100px] max-w-24 pl-0">
              Provider
            </TableHead>
            <TableHead className="min-w-[130px] max-w-32 pl-0">
              Account Id
            </TableHead>
            <TableHead className="min-w-[130px] max-w-32 pl-0">
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
