import * as React from 'react'
import { Typography, Tooltip, Box } from '@mui/material'
import { colorColorSorting } from 'functions/colorSortingFunc'
import { fabricSwatches } from 'public/fabricSwatches'

export interface SingleSortedColorProps {
  swatchKey: string
  sortType: string
}

var Color = function Color(hexVal) {
  this.hex = hexVal
}

export default function SingleSortedColor(props: SingleSortedColorProps) {
  let data = fabricSwatches[props.swatchKey]
  var colors = []
  Object.keys(data.swatches).forEach((swatchKey) => {
    let hex = data.swatches[swatchKey]
    var color = new Color(hex)
    color.swatchKey = swatchKey
    colorColorSorting.constructColor(color)
    colors.push(color)
  })

  let sortedColors = colorColorSorting.sortColorsBy(colors, props.sortType)

  return (
    <>
      <Typography component="h3" sx={{ mt: '20px' }}>
        {data.label}
      </Typography>
      {Object.keys(sortedColors).map((sortedColorKey) => {
        let color = sortedColors[sortedColorKey]
        let title = `${fabricSwatches[props.swatchKey].label}: ${
          color.swatchKey
        }`
        return (
          <Tooltip title={title}>
            <Box
              component="span"
              sx={{
                mr: '5px',
                backgroundColor: color.hex,
                height: '30px',
                width: '30px',
                display: 'inline-block'
              }}
            ></Box>
          </Tooltip>
        )
      })}
    </>
  )
}
