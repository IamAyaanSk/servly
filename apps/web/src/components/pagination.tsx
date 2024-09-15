'use client'

import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { GrFormPrevious } from 'react-icons/gr'
import { MdNavigateNext } from 'react-icons/md'

export default function Pagination({
  totalPages = 1,
  currentPage = 1,
  setCurrentPage,
}: {
  totalPages?: number
  currentPage?: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}) {
  return (
    <section className="flex gap-2 items-center justify-center p-4">
      <Button
        className={`shadow-none border-0 p-0 hover:bg-white text-[12px] ${currentPage < 2 ? ' text-neutral-500 hover:text-neutral-500 hover:cursor-not-allowed' : 'text-neutral-800 '}`}
        variant={'outline'}
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
      >
        <GrFormPrevious className="mr-1" />
        Prev
      </Button>

      <div className="flex gap-1 justify-center items-center">
        {Array.from({ length: totalPages }).map((_, index) => {
          return (
            <Button
              className={`text-[12px] bg-neutral-800 rounded-full h-2 w-3 p-[10px] ${index + 1 === currentPage && 'bg-neutral-800/70 hover:bg-neutral-800/70 hover:cursor-not-allowed'}`}
              onClick={() => {
                setCurrentPage(index + 1)
              }}
            >
              <span>{index + 1}</span>
            </Button>
          )
        })}
      </div>

      <Button
        className={`shadow-none border-0 p-0 hover:bg-white text-[12px] ${currentPage >= totalPages ? ' text-neutral-500 hover:text-neutral-500 hover:cursor-not-allowed' : 'text-neutral-800'}`}
        variant={'outline'}
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
      >
        Next
        <MdNavigateNext className="ml-1" />
      </Button>
    </section>
  )
}
