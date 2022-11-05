import * as React from 'react'
import {
  List,
  Link,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Box
} from '@mui/material'

export type LinkInfo = {
  avatar?: string
  label: string
  url: string
}

export interface LinksProps {
  links: LinkInfo[]
}

export default function Links(props: LinksProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.links !== undefined &&
        props.links.map((obj) => {
          return (
            <Link
              href={obj.url}
              key={`link-${obj.label}`}
              sx={{ textDecoration: 'none', color: '#3A3B3C' }}
            >
              <ListItem button key={obj.label}>
                <ListItemText primary={obj.label} />
              </ListItem>
            </Link>
          )
        })}
      <Link
        href="https://app.datadoghq.com/dashboard/a5j-nvc-9ck"
        target="_blank"
        sx={{ textDecoration: 'none', color: '#3A3B3C' }}
      >
        <ListItem button>
          <ListItemIcon>
            <Box sx={{ position: 'relative', left: '-4px' }}>Thing</Box>
          </ListItemIcon>
          <ListItemText primary="Merge Queue" />
        </ListItem>
      </Link>
    </List>
  )
}
