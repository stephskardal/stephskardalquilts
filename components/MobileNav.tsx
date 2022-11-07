import * as React from 'react'
import { Drawer, Box, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import MenuNav from './MenuNav'

export default function MobileNav() {
  const [open, setState] = React.useState<boolean>(false)
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    //changes the function state according to the value of open
    setState(open)
  }

  return (
    <>
      {!open && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          sx={{
            p: '2px 6px',
            display: {
              md: 'none',
              sm: 'block',
              xs: 'block'
            }
          }}
        >
          <MenuIcon sx={{ mt: '6px' }} />
        </IconButton>
      )}
      {open && (
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawer(false)}
          sx={{ p: '2px 6px' }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <Drawer
        //from which side the drawer slides in
        anchor="top"
        //if open is true --> drawer is shown
        open={open}
      >
        <Box
          id="mobile-nav"
          sx={{
            height: 1,
            backgroundColor: '#fff',
            mt: '75px'
          }}
        >
          <Box sx={{ mb: 2 }}>
            <MenuNav />
            <Box
              sx={{
                display: { xs: 'block', sm: 'block', md: 'none' },
                textAlign: 'center',
                mt: '20px',
                mb: '15px',
                background: '#f2d337',
                padding: '10px'
              }}
            >
              Gallery Links
            </Box>
            {[2022, 2021, 2020, 2019, 2018, 2017, 2016].map((year) => {
              return (
                <Button
                  key={year}
                  sx={{
                    textDecoration: 'none',
                    display: { xs: 'block', sm: 'none', color: '#000' },
                    fontSize: '12px'
                  }}
                  href={`/gallery/${year}`}
                >
                  {' '}
                  GALLERY: {year}
                </Button>
              )
            })}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
