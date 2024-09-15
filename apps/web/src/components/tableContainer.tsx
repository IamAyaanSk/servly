'use client'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { GetServiceHistoryResponse } from '@repo/types/api-responses'
import { Skeleton } from '@/components/ui/skeleton'
import VirtualizedTable from './virtualizedTable'
import { useToast } from '@/hooks/use-toast'
import { Button } from './ui/button'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import Pagination from './pagination'

const fetchServiceHistoryData = async (
  page: number
): Promise<GetServiceHistoryResponse> => {
  const { data } = await axios.get(
    `http://localhost:3002/services?page=${page}`
  )
  return data
}

export default function TableContainer() {
  const { toast } = useToast()
  const [tablePage, setTablePage] = useState<number>(1)

  const { isPending, isError, data, error } =
    useQuery<GetServiceHistoryResponse>({
      queryKey: ['service-history', tablePage],
      queryFn: () => fetchServiceHistoryData(tablePage),
    })

  useEffect(() => {
    if (isError) {
      toast({
        title: '⤫ Something went wrong!',
        description: 'Cannot fetch data, please try again.',
        variant: 'destructive',
      })
    }

    if (data) {
      toast({
        title: '✅ Data fetched successfully',
      })
    }
  }, [isError, data])

  return (
    <section className="p-6 m-6 rounded-lg shadow-lg border-2 border-opacity-10 flex flex-col justify-center">
      <div className="flex justify-between items-center mb-0">
        <div>
          <h3 className="text-xl font-medium">Service Request History</h3>
          <p className="text-sm text-gray-600">
            Here you will see your service request history.
          </p>
        </div>
        <div>
          <Button className="space-x-2">
            {' '}
            <FaCloudDownloadAlt /> <span>Download</span>
          </Button>
        </div>
      </div>
      <div className="px-2">
        {isError && (
          <section className="border rounded-lg border-red-300 bg-red-50 w-full h-[450px] mt-5 flex justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="bg-red-200 rounded-full p-4 w-[55px] h-[55px] border border-red-300 flex justify-center items-center">
                <p className="font-extrabold text-5xl text-red-300">!</p>
              </div>
              <p className="text-base text-red-400 font-medium">
                Something went wrong.
              </p>
            </div>
          </section>
        )}

        {isPending && (
          <section className="border rounded-lg overflow-clip w-full h-[450px] mt-5 flex justify-center items-center">
            <Skeleton className="w-full h-[450px] rounded-lg bg-zinc-200" />
          </section>
        )}

        {data && (
          <section className="border rounded-lg w-full h-[450px] mt-5 flex justify-center items-center overflow-clip">
            {data && <VirtualizedTable data={data} />}
          </section>
        )}
      </div>

      <section className="flex justify-between items-center">
        <div>
          {isPending ? (
            <Skeleton className="w-[240px] h-[20px] ml-2" />
          ) : (
            <Pagination
              totalPages={data?.response.totalPages}
              currentPage={tablePage}
              setCurrentPage={setTablePage}
            />
          )}
        </div>
        <div className={` p-4 ${isError ? 'hidden' : ' block'}`}>
          {isPending ? (
            <Skeleton className="w-[200px] h-[20px] text-[10px] text-neutral-500" />
          ) : (
            <p className="text-xs font-medium ">
              Showing {} of {data?.response.totalResults} records
            </p>
          )}
        </div>
      </section>
    </section>
  )
}
