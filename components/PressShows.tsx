import * as React from 'react'
import { Typography, Box } from '@mui/material'
import TimelineEvents from 'components/TimelineEvents'
import Image from 'next/legacy/image'

export default function PressShows() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '0px' }}>
        <Box sx={{ marginBottom: '40px' }}>
          <Image
            src="/logo.png"
            alt="Steph Skardal Quilts"
            width={714}
            height={200}
          />
        </Box>
        <Typography sx={{ fontSize: '30px' }}>
          As Seen (and Heard) In
        </Typography>
        <Typography sx={{ textAlign: 'left', marginBottom: '30px' }}>
          Email me at stephskardal@gmail.com if you are interested in sharing my
          work or interested in having me on a podcast. I love to share my work
          and inspiration!
        </Typography>
        <Typography sx={{ textAlign: 'left', marginBottom: '30px' }}>
          Below is a timeline of where I’ve been featured!
        </Typography>
        <TimelineEvents timeline={timelineData} />
      </Box>
    </Box>
  )
}
var timelineData = [
  {
    title: 'QuiltCon Magazine, February 2017',
    date: 'February 1, 2017',
    image: 'quiltcon2017.jpg',
    height: 250,
    width: 194
  },
  {
    title: 'QuiltCon 2017',
    date: 'February 20, 2017',
    image: 'quiltcon-logo.jpg',
    height: 430,
    width: 1500,
    detail: 'Quilts Shown: 2'
  },
  {
    title: 'Curated Quilts, Issue #1',
    date: 'September 1, 2017',
    image: 'curatedquilts.jpg',
    height: 2047,
    width: 1587
  },
  {
    title: 'Modern Quilts: Designs of the New Century, 2017',
    date: 'December 29, 2017',
    image: 'modernquilts.png',
    height: 1000,
    width: 750
  },
  {
    title: 'QuiltCon Magazine, February 2018',
    date: 'February 1, 2018',
    image: 'quiltcon-2018.jpg',
    height: 500,
    width: 370
  },
  {
    titole: 'QuiltCon 2018',
    date: 'February 20, 2018',
    test: 'Pasadena, CA Quilts Shown: 3 Award: Best in Show',
    image: 'quiltcon-logo.jpg',
    height: 430,
    width: 1500
  },
  {
    title: 'Best of QuiltCon Traveling Exhibit, 2018',
    date: 'March 1, 2018',
    image: 'mqg.png',
    height: 370,
    width: 709
  },
  {
    title: 'Sit & Sew Radio (Podcast)',
    date: 'March 1, 2018',
    image: 'sitsew.jpg',
    link: '',
    height: 106,
    width: 300
  },
  {
    title: 'Modern Sewciety, Episode 189',
    date: 'January 15, 2019',
    image: 'modernsewciety.png',
    link: '',
    height: 486,
    width: 581
  },
  {
    title: 'MQG Webinar Panel',
    date: 'January 17, 2019',
    image: 'webinar.png',
    height: 200,
    width: 300
  },
  {
    title: 'QuiltCon Magazine, February 2019',
    date: 'February 1, 2019',
    image: 'quiltcon2019.jpg',
    detail: "'Color Theory Meet Technology' Article & Gallery contribution",
    height: 3244,
    width: 2456
  },
  {
    title: 'QuiltCon, 2019',
    date: 'February 20, 2019',
    detail: 'Nashville, TN Quilts Shown: 5',
    image: 'quiltcon2019.jpg',
    height: 3244,
    width: 2456
  },
  {
    title: 'Chicago Quilt Festival, 2019',
    date: 'March 28, 2019',
    detail: 'Chicago, IL Quilt in “A Celebration of Color”',
    image: 'internationalquiltfestivalchicago.jpg',
    height: 213,
    width: 213
  },
  {
    title: 'The Creativity Project',
    date: 'April 13, 2019',
    detail: 'Interview for The Creativity Project.',
    image: 'creativity-project.jpg',
    height: 563,
    width: 1000
  },
  {
    title: 'Quick Quilts, Fall 2019',
    date: 'September 1, 2019',
    detail: 'Rainbow braid pattern',
    image: 'quick-quilts.jpg',
    width: 256,
    height: 346
  },
  {
    title: 'Quilt Festival Houston, 2019',
    date: 'September 1, 2019',
    detail: 'Houston, TX Quilt in “A Celebration of Color”',
    image: 'quiltfestival.jpg',
    height: 675,
    width: 500
  },
  {
    title: 'Quilting Arts',
    date: 'October 1 (Fall), 2019',
    detail: '“Color Theory Meets Technology” article',
    image: 'quiltingarts.png',
    height: 555,
    width: 1100
  },
  {
    title: 'QuiltCon Magazine, February 2020',
    date: 'February 1, 2020',
    detail: 'Pattern and Curved FPP contribution',
    image: 'quiltcon-2020.jpg',
    height: 954,
    width: 700
  },
  {
    title: 'QuiltCon, 2020',
    date: 'February 20, 2020',
    detail: 'Austin, TX Quilts Shown: 4',
    image: 'quiltcon-logo.jpg',
    height: 430,
    width: 1500
  },
  {
    title: 'The Great Wisconsin Quilt Show 2020 Modern Mini Quilt Challenge',
    date: 'May 28, 2020',
    detail: 'Received 8th place.',
    image: 'wisconsin-quilt.jpg',
    height: 1279,
    width: 1280
  },
  {
    title: 'QuiltCon Magazine, February 2021',
    date: 'February 1, 2021',
    detail: 'Article, “The Pivot to Virtual”, and Gallery contribution',
    image: 'quiltcon-2021.jpg',
    height: 779,
    width: 590
  },
  {
    title: 'QuiltCon, 2021',
    date: 'February 20, 2021',
    detail:
      'Showed 5 quilts(virtual).Taught classes on curved foundation paper piecing, strip piecing, and Procreate.',
    image: 'quiltcon-logo.jpg',
    height: 430,
    width: 1500
  },
  {
    title: 'Quilting Arts: 2021',
    date: 'August 18, 2021',
    detail:
      'Podcast on “The Intersection of Art and Technology”, available on quiltingdaily.com.',
    image: 'quiltingarts.png',
    link: '',
    height: 555,
    width: 1100
  },
  {
    title: 'Quilting Arts Magazine: 2021',
    date: 'November 15, 2021',
    detail: 'Article on laser quilting!',
    image: 'quiltingarts-2021.png',
    height: 918,
    width: 700
  },
  {
    title: 'Modern Meets Modern',
    date: 'February, 2022',
    detail: 'Top finalist',
    image: 'modern-meets-modern.jpg',
    link: 'https://www.internationalquiltmuseum.org/modern-meets-modern-challenge-results',
    height: 350,
    width: 350
  },
  {
    title: 'QuiltCon, 2022',
    date: 'February 27, 2022',
    detail: 'Showed 4 quilts. Taught classes on Procreate.',
    image: 'quiltcon-logo.jpg',
    height: 430,
    width: 1500
  },
  {
    title: 'MQG Make-a-Difference Challenge: Oceans',
    date: 'Summer, 2022',
    detail: '3rd place',
    image: 'make-a-difference.jpg',
    height: 1000,
    width: 1000
  }
]

// TODO: Fresh Quilting
// TODO: MQG Covid webinars
// TODO: Make Modern
