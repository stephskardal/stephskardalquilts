import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { Typography, Box, Link } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

export default function Footer() {
  const theme = useTheme()

  return (
    <Box
      sx={{ textAlign: 'center', background: 'black', m: '20px 0px' }}
      id="footer"
    >
      <Typography sx={{ m: '10px' }}>
        <Link href="https://stpehskardalquilts.com/" sx={{ ml: 2 }}>
          Steph Skardal Quilts
        </Link>
      </Typography>
      <Typography sx={{ mb: '10px' }}>
        <Link href="https://www.instagram.com/stephskardal/">
          <InstagramIcon sx={{ opacity: 0.8, mr: '10px' }} />
        </Link>
        <Link href="mailto:stephskardal@gmail.com">
          <MailOutlineIcon sx={{ opacity: 0.8 }} />
        </Link>
      </Typography>
      <Typography sx={{ mt: '5px' }}>Copyright - 2017 - 2022</Typography>
    </Box>
  )
}
