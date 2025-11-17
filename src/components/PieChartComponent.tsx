import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { MetricData } from '../types'

interface Props{ data: MetricData[] }

const COLORS = ['#6366F1','#F97316','#10B981','#EF4444','#8B5CF6']

export default function PieChartComponent({data}:Props){
  // budget allocation aggregated by category
  const agg: Record<string, number> = {}
  data.forEach(d=>{
    for(const k of Object.keys(d.budgetAllocation)){
      agg[k] = (agg[k]||0) + d.budgetAllocation[k]
    }
  })
  const chartData = Object.entries(agg).map(([name,value])=>({name,value}))

  return (
    <div className="card" aria-label="Budget allocation pie chart">
      <h3>Budget Allocation</h3>
      {chartData.length===0 ? <div className="skeleton"/> : (
        <div className="chart-viewport">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
              {chartData.map((_, idx)=>(<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
