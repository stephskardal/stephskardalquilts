import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { quiltconMetrics } from '../public/quiltconMetrics'
import { Typography, Box } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend)

let palette = [
  '#6929c4',
  '#1192e8',
  '#005d5d',
  '#9f1853',
  '#fa4d56',
  '#570408',
  '#198038',
  '#002d9c',
  '#ee538b',
  '#b28600',
  '#009d9a',
  '#012749',
  '#8a3800',
  '#a56eff'
]

export interface PieChartProps {
  year: number
}

export default function PieChart(props: PieChartProps) {
  let data = {
    labels: quiltconMetrics[props.year].map((z) => z[0]),
    datasets: [
      {
        label: '# of Quilts',
        data: quiltconMetrics[props.year].map((z) => z[1]),
        backgroundColor: palette,
        borderColor: palette
      }
    ]
  }

  let totalCount = quiltconMetrics[props.year]
    .map((z) => z[1])
    .reduce((sum, x) => sum + x)

  return (
    <Box sx={{ m: '20px' }}>
      <Typography>
        {props.year} Breakdown ({totalCount} total)
      </Typography>
      <Pie data={data} />
    </Box>
  )
}
