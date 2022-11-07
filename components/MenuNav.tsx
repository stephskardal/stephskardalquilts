import * as React from 'react'
import { Menu, MenuItem, Button } from '@mui/material'

export default function MenuNav() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          fontSize: '12px',
          position: 'relative',
          top: '1px',
          mr: '20px',
          display: {
            md: 'inline-block',
            sm: 'none',
            xs: 'none'
          }
        }}
      >
        Galleries
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {[2022, 2021, 2020, 2019, 2018, 2017, 2016].map((year) => {
          return (
            <MenuItem onClick={handleClose} key={year}>
              <Button href={`/gallery/${year}`}>{year}</Button>
            </MenuItem>
          )
        })}
      </Menu>
      <Button
        href="/blog"
        sx={{
          mr: '7px',
          textDecoration: 'none',
          color: '#000',
          fontSize: '12px'
        }}
      >
        BLOG
      </Button>
      <Button
        href="/tools"
        sx={{
          mr: '7px',
          textDecoration: 'none',
          color: '#000',
          fontSize: '12px'
        }}
      >
        TOOLS
      </Button>
      <Button
        href="/press-shows"
        sx={{
          mr: '7px',
          textDecoration: 'none',
          color: '#000',
          fontSize: '12px'
        }}
      >
        PRESS & SHOWS
      </Button>
      <Button
        href="/about"
        sx={{
          mr: '7px',
          textDecoration: 'none',
          color: '#000',
          fontSize: '12px'
        }}
      >
        ABOUT ME
      </Button>
      <Button
        href="/book-me"
        sx={{
          mr: '7px',
          textDecoration: 'none',
          color: '#000',
          fontSize: '12px'
        }}
      >
        BOOK ME
      </Button>
    </>
  )
}
