import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { MetricData } from '../types'
import Card from './ui/Card'
import { CHART_COLORS } from '../utils/colors'

interface Props{ data: MetricData[] }

export default function BarChartComponent({data}:Props){
  // compare department performance: sum revenue per department
  const agg = data.reduce((acc:Record<string,number>, cur)=>{
    acc[cur.department] = (acc[cur.department]||0) + cur.revenue
    return acc
  }, {})
  const chartData = Object.entries(agg).map(([department, revenue])=>({department, revenue}))

  return (
    <Card aria-label="Department performance bar chart" role="img">
      <h3 className="title">Department Performance</h3>
      {chartData.length===0 ? <div className="skeleton"/> : (
        <div className="chart-viewport">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department"/>
              <YAxis />
              <Tooltip/>
              <Bar dataKey="revenue" fill={CHART_COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
