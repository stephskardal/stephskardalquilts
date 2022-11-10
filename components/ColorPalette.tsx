import * as React from 'react'
import { Typography, Grid, Box, Divider, Button } from '@mui/material'

import ColorThief from 'functions/color-thief.js'
import chroma from 'chroma-js'
import FabricButtons from './FabricButtons'

import { fabricSwatches } from 'public/fabricSwatches'

export default function ColorPalette() {
  const [swatchResultWidth, setSwatchResultWidth] =
    React.useState<number>(undefined)
  const [matchType, setMatchType] = React.useState<string>('both')
  const [localImage, setLocalImage] = React.useState(undefined)
  const [loadedImage, setLoadedImage] = React.useState(undefined)
  const [selectedLine, setSelectedLine] =
    React.useState<string>('aurifilThread')
  const [colorSwatches, setColorSwatches] = React.useState([])

  const changeLine = (event) => {
    setSelectedLine(event.target.value)
  }

  const changeMatch = (event) => {
    setMatchType(event.target.value)
  }

  const renderSwatch = (swatch) => {
    let textColor = '#000'
    if (swatch.val < 0.6) {
      textColor = '#FFF'
    }

    if (matchType == 'both') {
      return (
        <Box
          key={swatch.color}
          className="swatch"
          sx={{
            width: `${swatchResultWidth}px`,
            height: `${swatchResultWidth}px`,
            position: 'relative',
            display: 'block',
            float: 'left',
            mr: '10px',
            mb: '10px'
          }}
        >
          <Box
            component="div"
            className="palette"
            sx={{
              height: '0px',
              width: '0px',
              borderRight: `${swatchResultWidth}px solid transparent`,
              borderTop: `${swatchResultWidth}px solid ${swatch.color}`,
              position: 'absolute'
            }}
          ></Box>
          <Box
            component="div"
            className="match"
            sx={{
              borderBottom: `${swatchResultWidth}px solid ${swatch.colorMatch}`,
              position: 'absolute',
              borderLeft: `${swatchResultWidth}px solid transparent`,
              height: '0px',
              width: '0px'
            }}
          ></Box>
          <Box
            className="detail"
            sx={{
              position: 'absolute',
              fontSize: '12px',
              width: `${swatchResultWidth}px`,
              height: `${swatchResultWidth}px`
            }}
          >
            <Box className="palette-detail" sx={{ color: textColor }}>
              Sat: {swatch.saturation} <br />
              Value: {swatch.val}
            </Box>
            <Box className="match-detail" sx={{ color: textColor }}>
              {swatch.match}
            </Box>
          </Box>
        </Box>
      )
    } else if (matchType == 'palette') {
      return (
        <Box
          className="swatch"
          sx={{
            width: `${swatchResultWidth}px`,
            height: `${swatchResultWidth}px`,
            position: 'relative',
            display: 'block',
            float: 'left',
            mr: '10px',
            mb: '10px',
            backgroundColor: swatch.color
          }}
        >
          <Box
            className="detail"
            sx={{
              position: 'absolute',
              fontSize: '12px',
              width: `${swatchResultWidth}px`,
              height: `${swatchResultWidth}px`
            }}
          >
            <Box className="palette-detail" sx={{ color: textColor }}>
              Sat: {swatch.saturation} <br />
              Value: {swatch.val}
            </Box>
          </Box>
        </Box>
      )
    } else {
      return (
        <Box
          className="swatch"
          sx={{
            width: `${swatchResultWidth}px`,
            height: `${swatchResultWidth}px`,
            position: 'relative',
            display: 'block',
            float: 'left',
            mr: '10px',
            mb: '10px',
            background: swatch.colorMatch
          }}
        >
          <Box
            className="detail"
            sx={{
              position: 'absolute',
              fontSize: '12px',
              width: `${swatchResultWidth}px`,
              height: `${swatchResultWidth}px`
            }}
          >
            <Box className="match-detail" sx={{ color: textColor }}>
              {swatch.match}
            </Box>
          </Box>
        </Box>
      )
    }
  }

  React.useEffect(() => {
    if (swatchResultWidth === undefined) {
      let width = document.getElementById('swatch-result').offsetWidth
      if (width < 600) {
        setSwatchResultWidth((width - 45) / 3)
      } else {
        setSwatchResultWidth((width - 60) / 4)
      }
    }
  }, [])

  React.useEffect(() => {
    if (localImage !== undefined) {
      let image = URL.createObjectURL(localImage)
      setLoadedImage(image)
      renderPalette(image)
    }
  }, [localImage, swatchResultWidth, selectedLine, matchType])

  const renderPalette = (filename: string) => {
    let palette = {}
    let swatches = []
    var colorThiefPalette = ColorThief.getPalette(filename, 18)
    colorThiefPalette.then((value) => {
      value.forEach((color, i) => {
        var chromaColor = chroma(color)
        var foundCloseColor = false
        Object.keys(palette).forEach((j, existingColor) => {
          if (chroma.distance(existingColor, chromaColor) < 15) {
            foundCloseColor = true
          }
        })
        if (!foundCloseColor) {
          palette[i] = chromaColor
          var closestMatch = Object.keys(
            fabricSwatches[selectedLine].swatches
          )[0]
          var closestDistance = 10000
          Object.keys(fabricSwatches[selectedLine].swatches).forEach(
            (swatchKey, j) => {
              var distance = chroma.distance(
                fabricSwatches[selectedLine].swatches[swatchKey],
                chromaColor
              )
              if (distance < closestDistance) {
                closestDistance = distance
                closestMatch = swatchKey
              }
            }
          )
          swatches.push({
            color: chromaColor.hex(),
            saturation: chromaColor.hsv()[1].toFixed(2),
            val: chromaColor.hsv()[2].toFixed(2),
            match: closestMatch,
            colorMatch: fabricSwatches[selectedLine].swatches[closestMatch]
          })
        }
      })
      setColorSwatches(swatches)
    })
  }

  const fileChanged = (el) => {
    setLocalImage(el.target.files[0])
  }

  return (
    <Grid container spacing="2">
      <Grid item md={2} xs={12} sx={{ textAlign: 'center' }}>
        <Typography component="h3">Upload Image</Typography>
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{ mr: '5px', mb: '5px' }}
        >
          Select File
          <input onChange={fileChanged} type="file" accept="image/*" hidden />
        </Button>
        {loadedImage && (
          <Box
            sx={{
              position: 'relative',
              height: 'auto',
              width: '100%',
              m: '0px auto'
            }}
          >
            <img
              src={loadedImage}
              alt=""
              style={{ objectFit: 'contain', maxWidth: '150px' }}
            />
          </Box>
        )}
        <Divider
          sx={{
            mt: '20px',
            mb: '20px'
          }}
        />
        <Typography component="h3">Match Type</Typography>
        <Button
          size="small"
          onClick={changeMatch}
          value="both"
          sx={{ mr: '5px', mb: '5px' }}
          variant={matchType == 'both' ? 'contained' : 'outlined'}
        >
          Both
        </Button>
        <Button
          onClick={changeMatch}
          value="palette"
          variant={matchType == 'palette' ? 'contained' : 'outlined'}
          size="small"
          sx={{ mr: '5px', mb: '5px' }}
        >
          Palette Match
        </Button>
        <Button
          size="small"
          variant={matchType == 'swatch' ? 'contained' : 'outlined'}
          onClick={changeMatch}
          sx={{ mr: '5px' }}
          value="swatch"
        >
          Swatch Match
        </Button>
      </Grid>
      <Grid item md={2} xs={12} sx={{ pr: '10px', pl: '10px' }}>
        <Divider
          sx={{
            mt: '20px',
            mb: '20px',
            display: { md: 'none', sm: 'block' }
          }}
        />
        <FabricButtons
          title="Fabric Line"
          onclickEvent={changeLine}
          selectedLine={selectedLine}
        />
      </Grid>
      <Grid item md={8} xs={12} sx={{ m: '0px auto' }} id="swatch-result">
        <Divider
          sx={{
            mt: '20px',
            mb: '20px',
            display: { md: 'none', sm: 'block' }
          }}
        />
        {colorSwatches.map((swatch) => renderSwatch(swatch))}
      </Grid>
    </Grid>
  )
}
