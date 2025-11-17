import { MetricData } from '../types'
import { addDays, formatISO } from 'date-fns'

const departments = ['Engineering','Sales','Marketing','HR','Support']
const budgetCategories = ['Salaries','Tools','Training','Marketing','Misc']

export function generateSampleData(days = 365): MetricData[]{
  const out: MetricData[] = []
  let date = new Date()
  date.setHours(0,0,0,0)
  date = addDays(date, -days)
  for(let i=0;i<days;i++){
    const ts = addDays(date, i)
    for(const dep of departments){
      const revenue = Math.round(20000 + Math.random()*80000 + (dep==='Sales'?20000:0) + i*5)
      const expenses = Math.round(revenue * (0.6 + Math.random()*0.2))
      const employeeCount = Math.round(5 + Math.random()*45)
      const attendance = Math.round(60 + Math.random()*40)
      const budgetAllocation: Record<string, number> = {}
      let remaining = 100000 + Math.round(Math.random()*200000)
      for(let j=0;j<budgetCategories.length;j++){
        const take = j===budgetCategories.length-1 ? remaining : Math.round(Math.random()*remaining)
        budgetAllocation[budgetCategories[j]] = take
        remaining -= take
      }
      out.push({
        timestamp: formatISO(ts),
        department: dep,
        revenue,
        expenses,
        employeeCount,
        attendance,
        budgetAllocation
      })
    }
  }
  return out
}
