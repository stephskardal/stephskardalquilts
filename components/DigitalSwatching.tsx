import * as React from 'react'
import {
  Typography,
  Grid,
  Divider,
  Box,
  IconButton,
  Button,
  Link
} from '@mui/material'
import { fabricSwatches } from 'public/fabricSwatches'
import Draggable from 'react-draggable'
import CloseIcon from '@mui/icons-material/Close'
import FabricButtons from 'components/FabricButtons'

export default function DigitalSwatching() {
  const [sortType, setSortType] = React.useState<string>('Hue')

  const changeType = (el) => {
    setSortType(el.target.value)
  }

  const [selectedLine, setSelectedLine] =
    React.useState<string>('aurifilThread')
  const [draggableSwatches, setDraggableSwatches] = React.useState<any[]>([])

  const resetSwatches = () => {
    setDraggableSwatches([])
    const boxes = document.querySelectorAll('.selected')
    boxes.forEach((box) => {
      box.classList.remove('selected')
    })
  }

  const changeLine = (el) => {
    setSelectedLine(el.target.value)
  }

  const closeItem = (el) => {
    el.preventDefault()
    let elId = el.target.id.replace(/^close-/, '')

    let updatedDraggableSwatches = []
    document.getElementById(elId).classList.remove('selected')
    draggableSwatches.forEach((r) => {
      if (r.name == elId) {
        r.visible = false
      }
      updatedDraggableSwatches.push(r)
    })
    setDraggableSwatches(updatedDraggableSwatches)
    return
  }

  const updateReplica = (el) => {
    let updatedDraggableSwatches = []
    if (!el.target.classList.contains('selected')) {
      let firstChild = el.target.id
      let found = false
      el.target.classList.add('selected')
      draggableSwatches.forEach((r) => {
        if (r.name == firstChild.id) {
          found = true
          r.visible = true
        }
        updatedDraggableSwatches.push(r)
      })
      if (!found) {
        let newEl = {
          visible: true,
          name: el.target.value,
          color: filteredSwatches[el.target.value]
        }
        updatedDraggableSwatches.push(newEl)
      }
    } else {
      el.target.classList.remove('selected')
      draggableSwatches.forEach((r) => {
        if (r.name == el.target.id) {
          r.visible = false
        }
        updatedDraggableSwatches.push(r)
      })
    }
    console.log('updating to')
    console.log(updatedDraggableSwatches)
    setDraggableSwatches(updatedDraggableSwatches)
  }

  let filteredSwatches = {}
  Object.keys(fabricSwatches).forEach((swatchKey) => {
    if (selectedLine == swatchKey) {
      Object.keys(fabricSwatches[swatchKey].swatches).forEach((key) => {
        let newKey: string = fabricSwatches[swatchKey].label + ': ' + key
        filteredSwatches[newKey] = fabricSwatches[swatchKey].swatches[key]
      })
    }
  })

  return (
    <Grid container spacing="4">
      <Grid item md={4} xs={12}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography component="h3">Instructions</Typography>
          <Typography>
            Click on one of the color dots to create a draggable swatch in the
            white space. Drag and drop the swatches around. Click Reset to clear
            your palette. Toggle various fabric lines to hide or show them.
          </Typography>
          {false && <Button variant="outlined">Export</Button>}
          {false && <Button variant="outlined">Random Pull</Button>}
          {false && (
            <>
              <Typography>Sort By</Typography>
              {['Hue', 'Saturation', 'Value', 'Luma', 'Chroma'].map(
                (type: string) => {
                  return (
                    <Button
                      variant="contained"
                      sx={{ mr: '5px' }}
                      value={type}
                      onClick={changeType}
                      disabled={sortType == type}
                    >
                      {type}
                    </Button>
                  )
                }
              )}
              <Divider />
            </>
          )}
          <Divider sx={{ mt: '20px' }} />

          <FabricButtons
            onclickEvent={changeLine}
            selectedLine={selectedLine}
            title="Fabric Line"
          />
        </Box>
      </Grid>
      <Grid item md={8} xs={12} id="draggingSection">
        <Divider
          sx={{
            mt: '20px',
            mb: '20px',
            display: { md: 'none', sm: 'block' }
          }}
        />
        <Box
          sx={{
            mb: '10px',
            border: '1px dotted #ddd',
            width: '100%',
            height: '400px',
            position: 'relative'
          }}
          id="swatch-bounds"
        >
          <Button
            variant="outlined"
            onClick={resetSwatches}
            sx={{ position: 'absolute', right: '0px' }}
          >
            Clear
          </Button>
          {draggableSwatches.map((swatch) => {
            let width =
              document.getElementById('swatch-bounds').offsetWidth - 80
            let bounds = { left: 0, top: 0, right: width, bottom: 250 }
            return (
              <Draggable bounds={bounds} grid={[10, 10]}>
                <Box
                  sx={{
                    pt: '5px',
                    background: '#FFF',
                    minHeight: '100px',
                    display: swatch.visible ? 'block' : 'none'
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: swatch.color,
                      mb: '5px',
                      height: '50px'
                    }}
                    disabled
                  ></Button>
                  <Typography sx={{ fontSize: '12px' }}>
                    {swatch.name}
                  </Typography>
                  <Link
                    href="#"
                    onClick={closeItem}
                    sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}
                  >
                    <CloseIcon
                      id={`close-${swatch.name}`}
                      sx={{ fontSize: '14px', color: '#000' }}
                    />
                  </Link>
                </Box>
              </Draggable>
            )
          })}
        </Box>
        <Box>
          {Object.keys(filteredSwatches).map((swatchKey) => {
            return (
              <IconButton
                id={swatchKey}
                name={swatchKey}
                value={swatchKey}
                sx={{
                  mr: '2px',
                  mb: '2px',
                  width: '25px',
                  height: '25px',
                  backgroundColor: filteredSwatches[swatchKey],
                  '&:hover': {
                    backgroundColor: filteredSwatches[swatchKey],
                    opacity: 0.8
                  }
                }}
                onClick={updateReplica}
              ></IconButton>
            )
          })}
        </Box>
      </Grid>
    </Grid>
  )
}
