import * as React from 'react'
import { Toolbar, Box, Typography, Link } from '@mui/material'
import Image from 'next/legacy/image'
import MobileNav from './MobileNav'
import MenuNav from './MenuNav'

export default function Header() {
  return (
    <Toolbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: '18px',
              marginTop: '7px'
            }}
          >
            <Image
              src="/favicon-32x32.png"
              width="32"
              height="32"
              alt="Steph Skardal Quilts"
              priority
            />
          </Link>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: '18px',
              margin: '2px 0px 0px 10px'
            }}
          >
            <Typography>Steph Skardal Quilts</Typography>
          </Link>
        </Box>
        <MobileNav />
        <Box
          sx={{
            display: {
              md: 'inline-block',
              sm: 'none',
              xs: 'none'
            }
          }}
        >
          <MenuNav />
        </Box>
      </Box>
    </Toolbar>
  )
}
