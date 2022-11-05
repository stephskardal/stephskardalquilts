import * as React from 'react'

import { Grid } from '@mui/material'

export interface GridDisplayProps {
  child1: any // change to react function
  child2: any
  child3?: any
}

export default function GridDisplay(props: GridDisplayProps) {
  return (
    <Grid container spacing={2}>
      {props.child3 === undefined && (
        <>
          <Grid item md={6} xs={12}>
            {props.child1}
          </Grid>
          <Grid item md={6} xs={12}>
            {props.child2}
          </Grid>
        </>
      )}
      {props.child3 !== undefined && (
        <>
          <Grid item md={4} xs={12}>
            {props.child1}
          </Grid>
          <Grid item md={4} xs={12}>
            {props.child2}
          </Grid>
          <Grid item md={4} xs={12}>
            {props.child3}
          </Grid>
        </>
      )}
    </Grid>
  )
}
