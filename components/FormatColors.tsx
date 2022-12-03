import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { fabricSwatches } from 'public/fabricSwatches'
import chroma from 'chroma-js'

export default function Footer() {
  let newSwatches = {}
  Object.keys(fabricSwatches).forEach((key) => {
    const newSwatchSet = Object.keys(fabricSwatches[key].swatches).map(
      (swatch) => {
        let hex = fabricSwatches[key].swatches[swatch]
        let color = chroma(hex)
        let hsv = color.hsl().map((z) => parseFloat(z.toFixed(2)))
        return {
          label: swatch,
          hex: hex,
          rgb: color.rgb(),
          hsv: hsv
        }
      }
    )
    newSwatches[key] = {
      label: fabricSwatches[key].label,
      swatches: newSwatchSet
    }
  })
  // console.log(JSON.stringify(newSwatches))

  return null
}
