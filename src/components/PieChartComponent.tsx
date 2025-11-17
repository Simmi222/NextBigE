import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { MetricData } from '../types'
import Card from './ui/Card'
import { CHART_COLORS } from '../utils/colors'

interface Props{ data: MetricData[] }

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
    <Card aria-label="Budget allocation pie chart" role="img">
      <h3 className="title">Budget Allocation</h3>
      {chartData.length===0 ? <div className="skeleton"/> : (
        <div className="chart-viewport">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
              {chartData.map((_, idx)=>(<Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />))}
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
