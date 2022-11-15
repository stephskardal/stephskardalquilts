import * as React from 'react'
import * as d3 from 'd3'
import { quickColorSorting } from 'functions/quickSortingFunc'
import { Grid, Button, CircularProgress, Box } from '@mui/material'

export default function ColorWheelFabricDistribution() {
  const battleshipRef = React.useRef()
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [sortedColors, setSortedColors] = React.useState<string[]>([])
  var colors: string[] = [
    '#4D693D',
    '#457D3A',
    '#6F782A',
    '#947D17',
    '#8A7520',
    '#9B791E',
    '#CB7917',
    '#E74D1B',
    '#C42F1E',
    '#BB212C',
    '#C22D25',
    '#C4353F',
    '#D05657',
    '#B32E46',
    '#AC224E',
    '#AC224E',
    '#902147',
    '#882547',
    '#7C2241',
    '#9C3169',
    '#A92E5A',
    '#B4597D',
    '#C688AE',
    '#AD7A98',
    '#987693',
    '#7F7D9A',
    '#282830',
    '#414F60',
    '#2C637D',
    '#256C84',
    '#2F859D',
    '#5E9DA8',
    '#92A3A4',
    '#99B5B4',
    '#B8B1B1',
    '#535053',
    '#3E3E43',
    '#565B69',
    '#C01F3B',
    '#4B537E'
  ]

  React.useEffect(() => {
    if (!loaded) {
      setSortedColors(quickColorSorting.sort(colors, 'hue'))
      setLoaded(true)
    }
  }, [])

  React.useEffect(() => {
    if (sortedColors.length > 0) {
      battleship()
    }
  }, [sortedColors])

  const refresh = () => {
    battleship()
  }

  const pullRandom = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const getColor = (xPos, yPos, maxX, maxY) => {
    let distance: number = Math.sqrt(xPos * xPos + yPos * yPos)
    let scaledTo: number = Number.parseInt(
      // @ts-ignore
      (colors.length * distance) / Math.sqrt(maxX * maxY * 2)
    )
    return sortedColors[scaledTo]
  }

  const battleship = () => {
    let maxDimensionX: number = 100
    let maxDimensionY: number = 120

    let markedData = []
    for (let i = 0; i < maxDimensionX; i++) {
      for (let j = 0; j < maxDimensionY; j++) {
        markedData[`${i}-${j}`] = 'background'
      }
    }

    let borderPixels = Object.keys(markedData).filter(
      (key) => markedData[key] == 'background'
    )
    var posX: number = 0
    var posY: number = 0
    while (borderPixels.length > 0) {
      let randomNumber: number = Math.floor(Math.random() * 4)
      if (randomNumber == 0) {
        // console.log('direction is up')
        var minY = posY
        while (minY > 1 && markedData[`${posX}-${minY}`] == 0) {
          minY -= 1
        }
        var maxDistance: number = Math.floor(Math.random() * maxDimensionY) + 1
        var xRange = [posX, posX + 1]
        var yRange = [posY - maxDistance, posY]
      } else if (randomNumber == 1) {
        // console.log('direction is down')
        var maxY = posY
        while (maxY < maxDimensionY && markedData[`${posX}-${maxY}`] == 0) {
          maxY++
        }
        var maxDistance: number = Math.floor(Math.random() * maxDimensionY) + 1
        var xRange = [posX, posX + 1]
        var yRange = [posY, posY + maxDistance]
      } else if (randomNumber == 2) {
        // console.log('direction is left')
        var minX = posX
        while (minX > 1 && markedData[`${minX}-${posY}`] == 0) {
          minX--
        }
        var maxDistance = Math.floor(Math.random() * maxDimensionX) + 1
        var xRange = [posX - maxDistance, posX + 1]
        var yRange = [posY, posY + 1]
      } else if (randomNumber == 3) {
        // console.log('direction is right')
        var maxX = posX
        while (maxX < maxDimensionX && markedData[`${maxX}-${posY}`] == 0) {
          maxX = maxX + 1
        }
        var maxDistance = Math.floor(Math.random() * maxDimensionX) + 1
        //let maxDistance = maxX - posX //Math.floor(Math.random() * (maxX - posX)) + 1;
        var xRange = [posX, posX + maxDistance]
        var yRange = [posY, posY + 1]
      }

      if (xRange[1] != xRange[0] && yRange[1] != yRange[0]) {
        let color = getColor(xRange[0], yRange[0], maxDimensionX, maxDimensionY)
        for (let i = xRange[0] - 2; i < xRange[1] + 2; i++) {
          for (let j = yRange[0] - 2; j < yRange[1] + 2; j++) {
            if (
              markedData[`${i}-${j}`] !== undefined &&
              markedData[`${i}-${j}`] == 'background'
            ) {
              markedData[`${i}-${j}`] = 'border'
            }
          }
        }

        // Creating the border
        for (let i = xRange[0] - 1; i < xRange[1] + 1; i++) {
          for (let j = yRange[0] - 1; j < yRange[1] + 1; j++) {
            if (
              markedData[`${i}-${j}`] !== undefined &&
              markedData[`${i}-${j}`] != 'white'
            ) {
              markedData[`${i}-${j}`] = 'white'
            }
          }
        }

        // Creating the color strip
        for (let i = xRange[0]; i < xRange[1]; i++) {
          for (let j = yRange[0]; j < yRange[1]; j++) {
            if (
              markedData[`${i}-${j}`] !== undefined &&
              !markedData[`${i}-${j}`].match(/^color-/)
            ) {
              markedData[`${i}-${j}`] = `color-${color}`
            }
          }
        }

        borderPixels = Object.keys(markedData).filter(
          (key) => markedData[key] == 'border'
        )
        if (borderPixels.length == 0) {
          borderPixels = Object.keys(markedData).filter(
            (key) => markedData[key] == 'background'
          )
        }
      } else {
        borderPixels = Object.keys(markedData).filter(
          (key) => markedData[key] == 'background'
        )
      }

      if (borderPixels.length != 0) {
        // Pick a random item from this array;
        let randomBorderPixel = pullRandom(borderPixels)
        posX = parseInt(randomBorderPixel.split('-')[0])
        posY = parseInt(randomBorderPixel.split('-')[1])

        let stillGray: string[] = Object.keys(markedData).filter(
          (key) => markedData[key] == 'border'
        )
        stillGray.forEach((z) => (markedData[z] = 'background'))
      }
    }

    d3.select('#battleship').select('svg').remove()

    let svg = d3
      .select('#battleship')
      .append('svg')
      // @ts-ignore
      .attr('width', battleshipRef.current.offsetWith)
      // @ts-ignore
      .attr('height', battleshipRef.current.offsetWidth)
      .attr('viewBox', `0 0 ${maxDimensionX} ${maxDimensionY}`)
    // draw a svg grid of rectangles, black
    for (let i = 0; i < maxDimensionX; i++) {
      // markedData[i] = []
      for (let j = 0; j < maxDimensionY; j++) {
        let val = markedData[`${i}-${j}`]
        let fill = '#000'
        if (val == 'white') {
          fill = '#FFF'
        }
        if (val.match('color')) {
          fill = val.split('-')[1]
        }

        svg
          .append('rect')
          .attr('width', 1)
          .attr('height', 1)
          .attr('x', i)
          .attr('y', j)
          .style('fill', fill)
          .style('stroke', '#FFF')
          .style('stroke-width', '0.01px')
      }
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          <Button onClick={refresh} variant="contained">
            Refresh
          </Button>
        </Grid>
        <Grid item sm={12} xs={12} ref={battleshipRef}>
          <div id="battleship"></div>
        </Grid>
      </Grid>
    </Box>
  )
}
