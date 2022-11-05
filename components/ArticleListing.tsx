import Link from 'next/link'
import Image from 'next/legacy/image'
import { Grid, Typography, Box } from '@mui/material'

export interface ArticleListingProps {
  title: string
  urlBase: string
  articles: any[]
}

function ArticleListing(props: ArticleListingProps) {
  return (
    <Box sx={{ m: '0px 3%' }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '50px',
          fontFamily: 'Inter Var',
          mb: '30px'
        }}
      >
        {props.title}
      </Typography>
      <Grid container spacing={0}>
        {props.articles.map((post) => {
          let route: string = post.title
            .replace(/\s+/g, '-')
            .toLowerCase()
            .replace(/[^0-9a-z-]/g, '')
          let linkUrl = props.urlBase + route
          return (
            <Grid key={route} item md={4} xs={12} sx={{ mb: '30px' }}>
              <Box sx={{ padding: '0px 3%' }}>
                <Link
                  href={linkUrl}
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  <Image
                    src={`/images/blog_thumb/${route}.jpg`}
                    alt="Steph Skardal Quilts"
                    width={post.width == undefined ? 540 : post.width}
                    height={post.height == undefined ? 400 : post.height}
                  />
                </Link>
                <Link
                  href={linkUrl}
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  <Typography sx={{ textAlign: 'center', color: '#000' }}>
                    {post.title}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default ArticleListing
