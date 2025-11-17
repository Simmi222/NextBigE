import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { MetricData } from '../types'
import { format } from 'date-fns'

interface Props{
  data: MetricData[]
}

export default function LineChartComponent({data}:Props){
  // aggregate revenue per day
  const map = new Map<string, number>()
  data.forEach(d=>{
    const day = format(new Date(d.timestamp), 'yyyy-MM-dd')
    map.set(day, (map.get(day)||0) + d.revenue)
  })
  const chartData = Array.from(map.entries()).map(([date, revenue])=>({date, revenue}))

  return (
    <div className="card" aria-label="Revenue trend chart">
      <h3>Revenue Trend</h3>
      {chartData.length===0 ? <div className="skeleton"/> : (
        <div className="chart-viewport">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(t)=>format(new Date(t),'MM/dd')}/>
              <YAxis />
              <Tooltip labelFormatter={(l)=>format(new Date(l as string),'PPPP')}/>
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
