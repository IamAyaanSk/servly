import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '@/components/header'

test('renders Header component with correct content', () => {
  render(<Header />)

  const headerElement = screen.getByRole('banner')
  expect(headerElement).toBeInTheDocument()

  const headingElement = screen.getByText(/Servly/i)
  expect(headingElement).toBeInTheDocument()

  const fallbackElement = screen.getByText(/AY/i)
  expect(fallbackElement).toBeInTheDocument()
})
