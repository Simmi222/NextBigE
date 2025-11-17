import { filterByDate, filterByDepartment } from '../utils/filterMetrics'

test('filters data by date range', () => {
  const data = [
    { timestamp: '2024-01-01', revenue: 100 },
    { timestamp: '2024-03-01', revenue: 200 }
  ]

  const result = filterByDate(data as any, '2024-02-01', '2024-12-31')
  expect(result).toHaveLength(1)
})

test('filters data by department', () => {
  const data = [
    { department: 'HR' },
    { department: 'IT' }
  ]

  const result = filterByDepartment(data as any, 'HR')
  expect(result).toHaveLength(1)
})
