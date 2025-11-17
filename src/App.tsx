import React, { useEffect, useMemo, useState } from 'react'
import { generateSampleData } from './data/sampleData'
import { MetricData } from './types'
import { applyFilters } from './utils/filters'
import LineChartComponent from './components/LineChartComponent'
import BarChartComponent from './components/BarChartComponent'
import PieChartComponent from './components/PieChartComponent'
import HeatmapComponent from './components/HeatmapComponent'
import Controls from './components/Controls'

export default function App(){
  const [data, setData] = useState<MetricData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<{from?:string,to?:string,department?:string}>({})
  const [theme, setTheme] = useState<'light'|'dark'>('light')

  useEffect(()=>{
    // simulate async load
    setLoading(true)
    setTimeout(()=>{
      const d = generateSampleData(180)
      setData(d)
      setLoading(false)
    }, 700)
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
  },[theme])

  const departments = useMemo(()=>Array.from(new Set(data.map(d=>d.department))),[data])

  const filtered = useMemo(()=>{
    if(loading) return []
    return applyFilters(data, filters)
  },[data, filters, loading])

  return (
    <div className="app" role="application" aria-label="Interactive dashboard">
      <div className="topbar">
        <h1>Company Metrics Dashboard</h1>
        <Controls data={data} onFilterChange={setFilters} departments={departments} theme={theme} onThemeChange={(t)=>setTheme(t as any)} />
      </div>

      {loading ? <div className="grid">
        <div className="card"><h3>Revenue Trend</h3><div className="skeleton"/></div>
        <div className="card"><h3>Department Performance</h3><div className="skeleton"/></div>
        <div className="card"><h3>Attendance Heatmap</h3><div className="skeleton"/></div>
        <div className="card"><h3>Budget Allocation</h3><div className="skeleton"/></div>
      </div> : (
        <div className="grid">
          <LineChartComponent data={filtered} />
          <BarChartComponent data={filtered} />
          <HeatmapComponent data={filtered} />
          <PieChartComponent data={filtered} />
        </div>
      )}
    </div>
  )
}
