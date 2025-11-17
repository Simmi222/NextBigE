import React, { useState } from 'react'
import { MetricData } from '../types'
import { exportSvgElementAsPng, exportSvgElementAsSvg } from '../utils/export'

interface Props{
  data: MetricData[]
  onFilterChange: (opts: {from?: string, to?: string, department?: string})=>void
  departments: string[]
  theme: string
  onThemeChange: (t:string)=>void
}

export default function Controls({data,onFilterChange,departments,theme,onThemeChange}:Props){
  const [from, setFrom] = useState<string | undefined>(undefined)
  const [to, setTo] = useState<string | undefined>(undefined)
  const [department, setDepartment] = useState<string | undefined>(undefined)

  function apply(){
    onFilterChange({from, to, department})
  }

  async function exportChart(type:'png'|'svg'){
    // find first svg in document (simple approach) — in real app pass refs
    const svg = document.querySelector('svg') as SVGElement | null
    if(!svg) return alert('No chart SVG found')
    if(type==='svg') await exportSvgElementAsSvg(svg, 'chart.svg')
    else await exportSvgElementAsPng(svg, 'chart.png')
  }

  return (
    <div className="card controls" role="toolbar" aria-label="Chart controls">
      <label>
        From
        <input aria-label="From date" type="date" value={from||''} onChange={e=>setFrom(e.target.value)}/>
      </label>
      <label>
        To
        <input aria-label="To date" type="date" value={to||''} onChange={e=>setTo(e.target.value)}/>
      </label>
      <label>
        Department
        <select aria-label="Department filter" value={department||''} onChange={e=>setDepartment(e.target.value||undefined)}>
          <option value="">All</option>
          {departments.map(d=>(<option key={d} value={d}>{d}</option>))}
        </select>
      </label>
      <button className="btn" onClick={apply} aria-label="Apply filters">Apply</button>
      <button className="btn" onClick={()=>onThemeChange(theme==='dark'?'light':'dark')} aria-pressed={theme==='dark'} aria-label="Toggle theme">Toggle Theme</button>
      <button className="btn" onClick={()=>exportChart('png')} aria-label="Export PNG">Export PNG</button>
      <button className="btn" onClick={()=>exportChart('svg')} aria-label="Export SVG">Export SVG</button>
    </div>
  )
}
