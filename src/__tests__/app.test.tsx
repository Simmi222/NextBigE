import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders header and controls', ()=>{
  render(<App />)
  expect(screen.getByText(/Company Metrics Dashboard/i)).toBeInTheDocument()
  expect(screen.getByRole('toolbar')).toBeInTheDocument()
})
