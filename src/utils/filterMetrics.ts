export function filterByDate<T extends { timestamp: string }>(data: T[], from?: string, to?: string){
  return data.filter(d=>{
    if(from && new Date(d.timestamp) < new Date(from)) return false
    if(to && new Date(d.timestamp) > new Date(to)) return false
    return true
  })
}

export function filterByDepartment<T extends { department?: string }>(data: T[], department?: string){
  if(!department) return data
  return data.filter(d=>d.department === department)
}
