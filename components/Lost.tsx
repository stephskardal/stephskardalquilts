import * as React from 'react'
import Image from 'next/legacy/image'
import { Typography, Box } from '@mui/material'

export default function About() {
  return (
    <Box sx={{ display: 'flex', margin: '0px auto' }}>
      <Box sx={{ flexGrow: 1, marginTop: '0px' }}>
        <Box sx={{ marginBottom: '40px' }}>
          <Image
            src="/logo.png"
            alt="Steph Skardal Quilts"
            width={714}
            height={200}
          />
        </Box>
        <Typography align="center" sx={{ marginBottom: '20px' }}>
          Hi, looks like you have come to a page that doesn't exist!
        </Typography>
        <Typography align="center" sx={{ marginBottom: '20px' }}>
          Please check out the links above for navigation options.
        </Typography>
      </Box>
    </Box>
  )
}

var timelineData = [
  {
    title: 'Fall 2013',
    text: 'Began sewing for baby, after sewing here and there over the years. I learned how to sew in junior high school and did mostly home sewing since that time. Once I had a little baby (born in March of 2013), I wanted a hobby that was tactile and included making things for her. I began sewing apparel at that time, mostly indie patterns',
    image: 'about-1.jpg',
    width: 500,
    height: 333
  },
  {
    title: '2014: Sewed my first quilt',
    text: 'Sewed first quilt, half square triangle designed by an apparel designer who I knew.I did not have a walking foot, and didn’t know much about binding, but I finished it and decided at that time that “I would never quilt again.”.'
  },
  {
    title: '2014 – 2015',
    text: 'Continued to sew apparel for the children, also had another kid.I experimented some in hand quilting while I was pregnant with that second kid and picked up a little bit more about quilting.'
  },
  {
    title: 'Late 2015',
    text: 'Made a few original design quilts, struggled, decided to find a local support sewing group which led to meeting an open sew group in North Carolina, where I attended classes monthly.'
  },
  {
    title: '2016: Year of Original Designs',
    text: 'In 2016, with the support of my local sewing group, I set a goal of creating one original quilt design per month.The designs varied in complexity, but I was able to complete my goal through the year.',
    image: 'about-2.jpg',
    width: 500,
    height: 334
  },
  {
    title: '2017: Continued Making, Also Had a Baby',
    text: 'In 2017, I continued making quilts! I also had a third baby in April of 2017, which paused some of my making for that time as we adjusted to a family of 3 children under 5!'
  },
  {
    title: '2018, January: Generative Art Journey Begins',
    text: 'In late 2017 and early 2018, I began my journey in generative art, mixing coding with quilt designs, having been inspired by the work of Libs Elliott.'
  },
  {
    title: '2018: QuiltCon Award',
    text: 'In February of 2018, I was awarded Best in Show at QuiltCon 2018 in Pasadena, California.That was a very unexpected and exciting time, and I followed the time after that exploring various revenue streams in the quilting industry(e.g.sponsorship, pattern writing, etc.).I also continued to explore building out web solutions that offered unique tools to the quilting space.',
    image: 'about-3.jpg',
    width: 500,
    height: 396
  },
  {
    title: '2019: Patterning',
    text: 'In 2019, I began writing patterns, having a pattern selected to be included in the MQG quilt of the month for early 2020.'
  },
  {
    title: '2020: Teaching Journey',
    text: 'In late 2019 and early 2020, I began expanding to include teaching in my repertoire.I continued working on pattern developments and explored various personal projects and new techniques.'
  },
  {
    title: '2021 – 2022: More Teaching, More Making',
    text: 'Over 2020 and 2021, I continued teaching and creating new pieces.I taught Procreate, strip piecing, and curved foundation paper piecing at QuiltCon Together in 2021. At QuiltCon 2022, I taught Procreate.',
    image: 'about-4.jpg',
    width: 500,
    height: 431
  }
]
