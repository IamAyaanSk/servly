import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import VirtualizedTable from '@/components/virtualizedTable'
import {
  ApiResponseStatus,
  GetServiceHistoryResponse,
} from '@repo/common-types/api-responses'

jest.mock('react-virtualized', () => ({
  AutoSizer: ({ children }: any) => children({ width: 1000, height: 600 }),
  List: ({ rowCount, rowRenderer, ...rest }: any) => (
    <div>
      {Array.from({ length: rowCount }).map((_, index) =>
        rowRenderer({ index, key: index, style: {} })
      )}
    </div>
  ),
}))

describe('VirtualizedTable', () => {
  const mockData: GetServiceHistoryResponse = {
    status: ApiResponseStatus.success,
    response: {
      payload: [
        {
          id: 'sklfkq;alk',
          customer_id: 'afkjva;kj',
          service_type: 'LOAN',
          description: 'Routine maintainance',
          status: 'COMPLETED',
          service_date: new Date(),
          transaction_id: 'trans123',
          payment_method: 'Credit Card',
          amount: 500,
          fees: 50,
          service_provider: 'BANK',
          account_id: 'acc123',
          reference_id: 'ref123',
        },
      ],
      totalPages: 1,
      totalResults: 1,
    },
  }

  test('renders table with data', () => {
    render(<VirtualizedTable data={mockData} />)

    expect(screen.getByText('Customer Id')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
    expect(screen.getByText('Transaction Id')).toBeInTheDocument()
    expect(screen.getByText('Payment Method')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Fees')).toBeInTheDocument()
    expect(screen.getByText('Provider')).toBeInTheDocument()
    expect(screen.getByText('Account Id')).toBeInTheDocument()
    expect(screen.getByText('Reference Id')).toBeInTheDocument()

    expect(screen.getByText('afkjva;kj')).toBeInTheDocument()
    expect(screen.getByText('LOAN')).toBeInTheDocument()
    expect(screen.getByText('Routine maintainance')).toBeInTheDocument()
    expect(screen.getByText('COMPLETED')).toBeInTheDocument()
    expect(screen.getByText('₹ 500')).toBeInTheDocument()
    expect(screen.getByText('₹ 50')).toBeInTheDocument()
    expect(screen.getByText('BANK')).toBeInTheDocument()
    expect(screen.getByText('acc123')).toBeInTheDocument()
    expect(screen.getByText('ref123')).toBeInTheDocument()
  })
})
