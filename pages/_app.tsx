import * as React from 'react'
// import 'nextra-theme-docs/style.css'
import 'styles/main.css'
import 'styles/courthouse.css'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from 'components/createEmotionCache'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'styles/theme'
import { Analytics } from '@vercel/analytics/react'

import { AppBar } from 'functions/drawer_components'
import { Box } from '@mui/material'
import Footer from 'components/footer'
import Header from 'components/header'
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function Nextra({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}) {
  // const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          open={false}
          drawerwidth={0}
          position="fixed"
          sx={{
            backgroundColor: '#f2d337'
          }}
        >
          <Header />
        </AppBar>
        <Box
          textAlign="center"
          sx={{ margin: '100px auto', maxWidth: '1000px' }}
        >
          <Component {...pageProps} />
          <Analytics />
        </Box>
        <AppBar
          position="relative"
          color="primary"
          sx={{ top: 'auto', bottom: 0, backgroundColor: 'black' }}
          open={false}
          drawerwidth={0}
        >
          <Footer />
        </AppBar>
      </ThemeProvider>
    </CacheProvider>
  )
}
// export default MyApp;
