import * as React from 'react'
import { fabricSwatches } from 'public/fabricSwatches'
import { Typography } from '@mui/material'
import Paginator from './PantonePaginator'
import Link from 'next/link'

export default function PantoneMatch() {
  let pantoneSwatches = Object.keys(fabricSwatches.pantone.swatches)

  return (
    <>
      <Typography sx={{ marginBottom: '2em' }}>
        After adding{' '}
        <Link href="/blog/pantone-now-in-the-color-tools">Pantone colors</Link>{' '}
        to my color tools, today I bring you tooling that matches Pantone colors
        to the 12 closest solids fabrics (or thread) colors. This displays :w
        all the Pantone colors (large color blocks) and the colors closest to
        them (listed below). Note that all of these colors are based on what is
        published by the manufacturer or data has been mined otherwise - digital
        color representation on fabric is not always 100% accurate.
      </Typography>
      <Typography sx={{ marginBottom: '4em' }}>
        Scroll through the pages of colors below, or search in the text box for
        a particular color!
      </Typography>
      <Paginator colors={pantoneSwatches} />
    </>
  )
}
