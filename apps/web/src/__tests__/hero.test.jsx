import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '@/components/Hero'

test('renders Hero component with correct content', () => {
  render(<Hero />)

  const headingElement = screen.getByText(/Welcome Back 👋🏻/i)
  expect(headingElement).toBeInTheDocument()

  const paragraphElement = screen.getByText(/Ayaan Shaikh/i)
  expect(paragraphElement).toBeInTheDocument()
})
