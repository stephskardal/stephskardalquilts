import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
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

let rawData = [
  ['Design', 2],
  ['Initial Piecing & Organizing', 7],
  ['Piecing', 27],
  ['Quilting (Machine)', 15],
  ['Binding', 4],
  ['Thread Burying', 1]
]

export default function EffortPieChart() {
  let data = {
    labels: rawData.map((z) => z[0]),
    datasets: [
      {
        label: '# of Quilts',
        data: rawData.map((z) => z[1]),
        backgroundColor: palette,
        borderColor: palette
      }
    ]
  }

  return (
    <Box sx={{ m: '20px' }}>
      <Typography>Effort Breakdown</Typography>
      <Pie data={data} />
    </Box>
  )
}
