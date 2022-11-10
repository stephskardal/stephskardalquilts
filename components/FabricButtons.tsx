import * as React from 'react'
import { Button, Typography, Box } from '@mui/material'
import { fabricSwatches } from 'public/fabricSwatches'

export interface FabricButtonsProps {
  onclickEvent
  title: string
  selectedLine: string
}

function FabricButtons(props: FabricButtonsProps) {
  const ordered = Object.keys(fabricSwatches)
    .sort()
    .reduce((obj, key) => {
      obj[key] = fabricSwatches[key]
      return obj
    }, {})

  return (
    <>
      <Typography component="h3">Fabric Line</Typography>
      {Object.keys(ordered).map((swatchKey) => {
        return (
          <Button
            key={swatchKey}
            size="small"
            onClick={props.onclickEvent}
            value={swatchKey}
            sx={{ mb: '5px', mr: '5px' }}
            variant={props.selectedLine == swatchKey ? 'contained' : 'outlined'}
          >
            {fabricSwatches[swatchKey].label}
          </Button>
        )
      })}
    </>
  )
}

export default FabricButtons
