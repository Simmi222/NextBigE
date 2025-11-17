import { MetricData } from '../types'

// Clean sample data file exported for assignment submission
export const sampleMetrics: MetricData[] = [
  {
    timestamp: '2025-01-01T00:00:00Z',
    department: 'Sales',
    revenue: 120000,
    expenses: 60000,
    employeeCount: 12,
    attendance: 88,
    budgetAllocation: { Salaries: 80000, Tools: 10000, Marketing: 20000 }
  },
  {
    timestamp: '2025-01-02T00:00:00Z',
    department: 'Engineering',
    revenue: 90000,
    expenses: 40000,
    employeeCount: 18,
    attendance: 92,
    budgetAllocation: { Salaries: 70000, Tools: 15000, Training: 5000 }
  }
]

export default sampleMetrics
