export interface MetricData {
  timestamp: string; // ISO date
  department: string;
  revenue: number;
  expenses: number;
  employeeCount: number;
  attendance: number; // 0-100
  budgetAllocation: { [category: string]: number };
}
