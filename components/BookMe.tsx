import * as React from 'react'
import Image from 'next/legacy/image'
import { Divider, Typography, Grid, Box } from '@mui/material'

export default function BookMe() {
  return (
    <Box sx={{ margin: '0px', display: 'flex' }}>
      <Box sx={{ flexGrow: 1, mt: '0px' }}>
        <Image
          src="/logo.png"
          alt="Steph Skardal Quilts"
          width={720}
          height={214}
        />
        <Typography
          component="h1"
          sx={{ textAlign: 'center', fontSize: '30px', m: '20px 0px' }}
        >
          Book Me in 2023!
        </Typography>
        <Typography align="left" sx={{ mt: '30px', mb: '10px' }}>
          I offer the following lectures:
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Image src="/images/trunkshow.jpg" width="960" height="540" />
            <Typography component="h3">
              Trunk Show: My Quilting Journey through the Years
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Image
              src="/images/creativity_reboot.jpg"
              width="960"
              height="540"
            />
            <Typography component="h3">
              On Creativity: Pushing Your Creative Boundaries
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ m: '30px 0px' }} />
        <Typography align="left" sx={{ marginTop: '10px' }}>
          Please feel free to contact me at stephskardal@gmail.com for rates and
          availability.
        </Typography>
      </Box>
    </Box>
  )
}
