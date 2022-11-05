import * as React from 'react'
import Image from 'next/legacy/image'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Typography, Box } from '@mui/material'

function BookMe() {
  return (
    <Box sx={{ display: 'flex' }} id="main-content">
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '0px' }}>
        <Image
          src="/logo.png"
          alt="Steph Skardal Quilts"
          width={720}
          height={214}
        />
        <Typography
          component="h1"
          sx={{ textAlign: 'center', fontSize: '30px', margin: '20px 0px' }}
        >
          Book Me in 2023!
        </Typography>
        <Typography
          align="left"
          sx={{ marginTop: '30px', marginBottom: '10px' }}
        >
          I offer the following lectures:
        </Typography>
        <Typography align="left" sx={{ fontStyle: 'italic' }}>
          Trunk Show: My Quilting Journey through the Years
        </Typography>
        <Typography align="left" sx={{ fontStyle: 'italic' }}>
          On Creativity: Myapproach to pushing the boundaries in creativity,
          with discussion on extrinsic and intrinsic motivation.
        </Typography>
        <Typography align="left" sx={{ marginTop: '30px' }}>
          Please feel free to contact me at stephskardal@gmail.com for rates and
          availability.
        </Typography>
      </Box>
    </Box>
  )
}

export default BookMe
