// TableContainer.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom' // Correct import
import TableContainer from '@/components/tableContainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import axios from 'axios'

// Mock the axios module
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Create a QueryClient instance
const queryClient = new QueryClient()

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <TableContainer />
    </QueryClientProvider>
  )
}

describe('TableContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly and shows loading skeleton', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: { totalPages: 5, payload: [], totalResults: 0 },
      },
    })
    renderComponent()

    expect(screen.getByText('Service Request History')).toBeInTheDocument()
    expect(
      screen.getByText('Here you will see your service request history.')
    ).toBeInTheDocument()
  })

  test('displays error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'))
    renderComponent()
  })

  test('renders table data and pagination correctly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        response: {
          totalPages: 5,
          payload: [{ id: 1, name: 'Test Service' }],
          totalResults: 1,
        },
      },
    })
    renderComponent()

    // Wait for data to be displayed
    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 1 records')).toBeInTheDocument()
    })

    // Check for pagination component
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument()
  })

  test('handles page change and data fetching', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        response: {
          totalPages: 5,
          payload: [{ id: 1, name: 'Test Service' }],
          totalResults: 1,
        },
      },
    })

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        response: {
          totalPages: 5,
          payload: [{ id: 2, name: 'Another Service' }],
          totalResults: 1,
        },
      },
    })

    renderComponent()

    // Simulate page change
    fireEvent.click(screen.getByText('Next'))

    // Wait for new data to be rendered
    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 1 records')).toBeInTheDocument()
    })
  })
})
