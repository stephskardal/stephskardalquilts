import * as React from 'react'
import { CardMedia, Typography, Card, Box } from '@mui/material'
import Link from 'next/link'

export interface HeroImageProps {
  src: string
  text: string
  link: string
}

export default function HeroImage(props: HeroImageProps) {
  return (
    <Card sx={{ maxWidth: '100%' }} square={true}>
      <Box sx={{ position: 'relative' }}>
        <Link href={props.link}>
          <CardMedia component="img" image={`/hero/${props.src}`} />
        </Link>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            color: 'white',
            padding: '20px'
          }}
        >
          <Link href={props.link} style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              sx={{ textAlign: 'center', color: '#FFF', fontSize: '17px' }}
            >
              {props.text}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Card>
  )
}
