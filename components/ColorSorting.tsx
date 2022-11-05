import * as React from 'react'
import { Box, Button } from '@mui/material'

import { fabricSwatches } from '../public/custom_js/fabricSwatches'
import SingleSortedColor from './SingleSortedColor'

export default function ColorSorting() {
  const [sortType, setSortType] = React.useState<string>('Hue')

  const changeType = (el) => {
    setSortType(el.target.value)
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      {['Hue', 'Saturation', 'Value', 'Luma', 'Chroma'].map((type: string) => {
        return (
          <Button
            size="small"
            sx={{ mr: '5px' }}
            value={type}
            onClick={changeType}
            variant={sortType == type ? 'contained' : 'outlined'}
          >
            {type}
          </Button>
        )
      })}
      {Object.keys(fabricSwatches).map((swatchKey) => {
        return <SingleSortedColor swatchKey={swatchKey} sortType={sortType} />
      })}
    </Box>
  )
}
