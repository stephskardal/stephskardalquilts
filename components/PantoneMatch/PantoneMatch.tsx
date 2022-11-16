import * as React from 'react'
import { fabricSwatches } from 'public/fabricSwatches'
import { Typography } from '@mui/material'
import Paginator from './Paginator'

export default function PantoneMatch() {
  let pantoneSwatches = Object.keys(fabricSwatches.pantone.swatches)

  return (
    <>
      <Typography sx={{ marginBottom: '2em' }}>
        Today I bring you tooling that matches Pantone colors to the 12 closest
        solids fabrics (or thread) colors. This presents all the Pantone colors
        (large color blocks) and the colors closest to them (listed below). Note
        that all of these colors are based on what is published by the
        manufacturer or data mined otherwise.
      </Typography>
      <Typography sx={{ marginBottom: '4em' }}>
        Scroll through the pages of colors below, or search in the text box for
        a particular color!
      </Typography>
      <Paginator colors={pantoneSwatches} />
    </>
  )
}
