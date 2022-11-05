import * as React from 'react'
import { Typography, Divider, Grid, Box, Button } from '@mui/material'

import ColorThief from '../functions/color-thief.js'
import chroma from 'chroma-js'

import { fabricSwatches } from '../public/custom_js/fabricSwatches'

export default function ColorPalette() {
  const [matchType, setMatchType] = React.useState<string>('both')
  const [localImage, setLocalImage] = React.useState(undefined)
  const [loadedImage, setLoadedImage] = React.useState(undefined)
  const [selectedLine, setSelectedLine] =
    React.useState<string>('aurifilThread')
  const [colorSwatches, setColorSwatches] = React.useState([])

  const changeLine = (event) => {
    setSelectedLine(event.target.value)
    renderPalette(loadedImage)
  }

  const changeMatch = (event) => {
    setMatchType(event.target.value)
    renderPalette(loadedImage)
  }

  const renderSwatch = (swatch) => {
    let textColor = '#000'
    if (swatch.val < 0.6) {
      textColor = '#FFF'
    }

    console.log(swatch)

    if (matchType == 'both') {
      return (
        <Box
          className="swatch"
          sx={{
            width: '150px',
            height: '150px',
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
              borderRight: '150px solid transparent',
              borderTop: `150px solid ${swatch.color}`,
              position: 'absolute'
            }}
          ></Box>
          <Box
            component="div"
            className="match"
            sx={{
              borderBottom: `150px solid ${swatch.colorMatch}`,
              position: 'absolute',
              borderLeft: '150px solid transparent',
              height: '0px',
              width: '0px'
            }}
          ></Box>
          <Box
            className="detail"
            sx={{
              position: 'absolute',
              fontSize: '12px',
              width: '150px',
              height: '150px'
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
            width: '150px',
            height: '150px',
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
              width: '150px',
              height: '150px'
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
            width: '150px',
            height: '150px',
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
              width: '150px',
              height: '150px'
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
    if (localImage !== undefined) {
      let image = URL.createObjectURL(localImage)
      setLoadedImage(image)
      renderPalette(image)
    }
  }, [localImage])

  const renderPalette = (filename: string) => {
    let palette = {}
    let swatches = []
    var colorThiefPalette = ColorThief.getPalette(filename, 16)
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
          var paletteExtraCss = ''
          if (chromaColor.hsv()[2] < 0.5) {
            paletteExtraCss = 'color:#FFF;'
          }

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
          var matchExtraCss = ''
          if (
            chroma(
              fabricSwatches[selectedLine].swatches[closestMatch]
            ).hsv()[2] < 0.5
          ) {
            matchExtraCss = 'color:#FFF;'
          }

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
      <Grid item md={8} xs={12} sx={{ m: '0px auto' }}>
        {colorSwatches.map((swatch) => renderSwatch(swatch))}
      </Grid>
      <Grid item md={2} xs={12} sx={{ textAlign: 'center' }}>
        <Typography component="h3">Match Type</Typography>
        <Button
          size="small"
          onClick={changeMatch}
          value="both"
          sx={{ mb: '5px', mr: '5px' }}
          variant={matchType == 'both' ? 'contained' : 'outlined'}
        >
          Both
        </Button>
        <Button
          onClick={changeMatch}
          value="palette"
          variant={matchType == 'palette' ? 'contained' : 'outlined'}
          size="small"
          sx={{ mb: '5px', mr: '5px' }}
        >
          Palette Match
        </Button>
        <Button
          size="small"
          variant={matchType == 'swatch' ? 'contained' : 'outlined'}
          onClick={changeMatch}
          sx={{ mb: '20px', mr: '5px' }}
          value="swatch"
        >
          Swatch Match
        </Button>
        <Divider />
        <Button
          variant="contained"
          component="label"
          size="small"
          sx={{ mb: '5px', mr: '5px', mt: '20px' }}
        >
          Upload File
          <input onChange={fileChanged} type="file" accept="image/*" hidden />
        </Button>
        {loadedImage && (
          <Box
            sx={{
              position: 'relative',
              height: 'auto',
              width: '150px',
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
      </Grid>
      <Grid item md={2} xs={12}>
        <Typography component="h3">Fabric Line</Typography>
        {Object.keys(fabricSwatches).map((swatchKey) => {
          return (
            <Button
              size="small"
              onClick={changeLine}
              value={swatchKey}
              sx={{ mb: '5px', mr: '5px' }}
              variant={selectedLine == swatchKey ? 'contained' : 'outlined'}
            >
              {swatchKey}
            </Button>
          )
        })}
      </Grid>
    </Grid>
  )
}
