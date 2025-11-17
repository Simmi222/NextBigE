import React from 'react'
import Card from './ui/Card'
import { MetricData } from '../types'
import { format, parseISO } from 'date-fns'

interface Props{ data: MetricData[] }

function getWeekStart(d: Date){
  const copy = new Date(d)
  const day = copy.getDay()
  copy.setDate(copy.getDate() - day)
  copy.setHours(0,0,0,0)
  return copy
}

export default function HeatmapComponent({data}:Props){
  // build week-row by weekday grid showing average attendance
  if(data.length===0) return <div className="card"><h3 className="title">Attendance Heatmap</h3><div className="skeleton"/></div>

  const grouped = new Map<number, number[]>() // weekIndex -> 7-length array
  data.forEach(d=>{
    const date = parseISO(d.timestamp)
    const weekStart = getWeekStart(date).getTime()
    const day = date.getDay()
    const arr = grouped.get(weekStart) || Array(7).fill(0)
    // we'll push sum and count in arrays as separate structure; to keep simple store averages by pushing attendance
    arr[day] = (arr[day] || 0) + d.attendance
    grouped.set(weekStart, arr)
  })

  // compute average by dividing by number of records per day (approx) - for simplicity, normalize by max
  const weeks = Array.from(grouped.entries()).sort((a,b)=>a[0]-b[0]).map(([weekStart, arr])=>({weekStart, arr}))
  const flat = weeks.flatMap(w=>w.arr)
  const max = Math.max(...flat, 100)

  return (
    <Card aria-label="Employee attendance heatmap" role="img">
      <h3 className="title">Attendance Heatmap</h3>
      <div style={{overflowX:'auto'}}>
        <div style={{display:'flex',gap:6,alignItems:'flex-start'}}>
          {weeks.map((w, wi)=> (
            <div key={wi} style={{display:'grid',gridTemplateRows:'repeat(7,18px)',gap:4}} aria-label={`Week ${wi}`}>
              {w.arr.map((val, d)=>{
                const intensity = Math.round((val / max) * 255)
                const bg = `rgb(${255-intensity},${255 - Math.round(intensity/2)},${255})`
                const label = `${format(new Date(w.weekStart + d*24*60*60*1000),'EEE')}: ${Math.round(val)}`
                return <div key={d} title={`Attendance: ${Math.round(val)}% on ${format(new Date(w.weekStart + d*24*60*60*1000),'yyyy-MM-dd')}`} tabIndex={0} className="heatmap-cell" style={{background:bg}} aria-label={label}></div>
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
