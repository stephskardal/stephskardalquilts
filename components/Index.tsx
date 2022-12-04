import * as React from 'react'
import Image from 'next/legacy/image'
import { Grid, Typography, Box } from '@mui/material'
import HeroImage from 'components/HeroImage'

export default function Index() {
  return (
    <Box sx={{ display: 'flex', margin: '0px auto' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '0px' }}>
        <Box sx={{ marginBottom: '50px' }}>
          <Image
            src="/logo.png"
            alt="Steph Skardal Quilts"
            width={714}
            height={200}
            priority
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Box
              sx={{
                marginBottom: '30px',
                display: { md: 'block', sm: 'none', xs: 'none' }
              }}
            >
              <HeroImage
                src="hero1.jpg"
                text="Aurifil Artisan Challenge: April 2021"
                link="/blog/aurifil-artisan-challenge-april-2021"
              />
            </Box>
            <Box sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}>
              <Image
                src="/logo.png"
                alt="Steph Skardal Quilts"
                width={357}
                height={100}
              />
            </Box>
            <Typography
              align="left"
              sx={{ margin: '20px 0px', fontSize: '20px' }}
            >
              Welcome! Welcome to my quilt-y website! You can find me posting on
              a regular basis over at Instagram, but here’s where I share blog
              posts, website tools, and a collection of my finished work. I hope
              you enjoy!
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box
              sx={{
                marginBottom: '20px',
                display: { md: 'none', sm: 'block', xs: 'block' }
              }}
            >
              <HeroImage
                src="hero1.jpg"
                text="Aurifil Artisan Challenge: April 2021"
                link="/blog/aurifil-artisan-challenge-april-2021"
              />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <HeroImage
                src="quiltysolid.png"
                text="A Quilty Solid: Mobile App Released"
                link="/aquiltysolid"
              />
            </Box>
            <HeroImage
              src="hero2.jpg"
              text="Aurifil Artisan Challenge: December 2021"
              link="/blog/aurifil-artisan-challenge-december-2021"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
