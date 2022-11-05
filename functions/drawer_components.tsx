import { styled } from '@mui/material/styles'

import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

const openedMixin = (theme, drawerwidth) => ({
  width: drawerwidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflow: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  //overflowX: "hidden",
  overflow: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.down('sm')]: {
    width: '0px'
  }
})

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => true
})<AppBarProps & { open: boolean; drawerwidth: number }>(
  ({ theme, drawerwidth, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerwidth,
      width: `calc(100% - ${drawerwidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  })
)

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => true
})<DrawerProps & { open: boolean; drawerwidth: number }>(
  ({ theme, drawerwidth, open }) => ({
    width: drawerwidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, drawerwidth),
      '& .MuiDrawer-paper': openedMixin(theme, drawerwidth)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)
