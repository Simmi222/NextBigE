import { applyFilters } from '../utils/filters'

const sample = [
  { timestamp: '2025-01-01T00:00:00Z', department: 'Sales', revenue: 100, expenses: 50, employeeCount: 10, attendance: 80, budgetAllocation: {A:1} },
  { timestamp: '2025-02-01T00:00:00Z', department: 'Engineering', revenue: 200, expenses: 100, employeeCount: 8, attendance: 90, budgetAllocation: {A:2} },
]

test('filters by department', ()=>{
  const out = applyFilters(sample as any, {department: 'Sales'})
  expect(out).toHaveLength(1)
  expect(out[0].department).toBe('Sales')
})

test('filters by date range', ()=>{
  const out = applyFilters(sample as any, {from: '2025-01-15', to: '2025-03-01'})
  expect(out).toHaveLength(1)
  expect(out[0].department).toBe('Engineering')
})
