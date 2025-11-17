import { MetricData } from '../types'

export interface Filters { from?: string; to?: string; department?: string }

export function applyFilters(data: MetricData[], filters: Filters){
  return data.filter(d=>{
    if(filters.department && d.department !== filters.department) return false
    if(filters.from && new Date(d.timestamp) < new Date(filters.from)) return false
    if(filters.to && new Date(d.timestamp) > new Date(filters.to)) return false
    return true
  })
}
