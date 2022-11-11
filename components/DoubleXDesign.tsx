import * as React from 'react'
import * as d3 from 'd3'
import { quickColorSorting } from '../functions/quickSortingFunc'
import { Grid, Button, Box } from '@mui/material'

export default function ColorWheelFabricDistribution() {
  const doublexRef = React.useRef()
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [sortedColors, setSortedColors] = React.useState<string[]>([])
  var colors: string[] = [
    '#813f7f',
    '#592567',
    '#9d4381',
    '#b7639e',
    '#b67aad',
    '#cf639d',
    '#d983a6',
    '#d47394',
    '#dea1b3',
    '#edcad0',
    '#f5e0e7',
    '#ebccd2',
    '#dfa4a8',
    '#e4aab6',
    '#d88a97',
    '#de98bd',
    '#e2a19f',
    '#cd5b75',
    '#cf586e',
    '#f58079',
    '#d46456',
    '#e3a181',
    '#dd8987',
    '#91232c',
    '#802524',
    '#a41f20',
    '#ca383b',
    '#ab1e2f',
    '#c82e2e',
    '#c12526',
    '#cb3e35',
    '#c61d22',
    '#d46456',
    '#a41f20',
    '#ca383b',
    '#ab1e2f',
    '#c06f44',
    '#df9443',
    '#ebb65a',
    '#e8ad4f',
    '#ebb537',
    '#f0c542',
    '#e4c48b',
    '#ebba77',
    '#f8da2c',
    '#fae39d',
    '#d5dea9',
    '#d4cc7b',
    '#cad77f',
    '#aec539',
    '#ccc994',
    '#2b8349',
    '#276139'
  ]

  React.useEffect(() => {
    if (!loaded) {
      setSortedColors(quickColorSorting.sort(colors, 'hue'))
      setLoaded(true)
    }
  }, [])

  React.useEffect(() => {
    doublex()
  }, [sortedColors])

  const refresh = () => {
    doublex()
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

  const doublex = () => {
    let maxDimension: number = 120
    let diagonalDistance: number = Math.sqrt(2 * maxDimension * maxDimension)
    var posX: number = 0 //maxDimension / 2;
    var posY: number = 0 //maxDimension / 2;
    var markedData = []

    for (let i = 0; i < maxDimension; i++) {
      for (let j = 0; j < maxDimension; j++) {
        markedData[`${i}-${j}`] = 'background'
      }
    }

    // @ts-ignore
    let triangleCenter: number = parseInt(maxDimension / 2)

    ;[50, 40, 30, 20, 10].forEach((triangleHeight) => {
      var fill = 'white'
      if (triangleHeight % 20 == 0) {
        fill = 'background'
      }
      for (
        let i = triangleCenter - triangleHeight;
        i < triangleCenter + triangleHeight;
        i++
      ) {
        for (
          let j = 0;
          j < triangleHeight - Math.abs(triangleCenter - i);
          j++
        ) {
          markedData[`${i}-${j}`] = fill
          markedData[`${j}-${i}`] = fill

          var flippedY = maxDimension - j
          markedData[`${i}-${flippedY}`] = fill
          var flippedX = maxDimension - j
          if (flippedX != maxDimension) {
            markedData[`${flippedX}-${i}`] = fill
          }
        }
      }
    })

    console.log(markedData)

    let borderPixels = Object.keys(markedData).filter(
      (key) => markedData[key] == 'background'
    )
    var posX: number = 0
    var posY: number = 0
    while (borderPixels.length > 0) {
      // for (let z = 0; z < 2; z++) {
      let randomNumber: number = Math.floor(Math.random() * 4)
      if (randomNumber == 0) {
        // console.log('direction is up')
        var minY = posY
        while (minY > 1 && markedData[`${posX}-${minY}`] == 0) {
          minY -= 1
        }
        var maxDistance: number = Math.floor(Math.random() * 10) + 1
        var xRange = [posX, posX + 1]
        var yRange = [posY - maxDistance, posY]
      } else if (randomNumber == 1) {
        // console.log('direction is down')
        var maxY = posY
        while (maxY < maxDimension && markedData[`${posX}-${maxY}`] == 0) {
          maxY++
        }
        var maxDistance: number = Math.floor(Math.random() * 10) + 1
        var xRange = [posX, posX + 1]
        var yRange = [posY, posY + maxDistance]
      } else if (randomNumber == 2) {
        // console.log('direction is left')
        var minX = posX
        while (minX > 1 && markedData[`${minX}-${posY}`] == 0) {
          minX--
        }
        var maxDistance = Math.floor(Math.random() * 10) + 1
        var xRange = [posX - maxDistance, posX + 1]
        var yRange = [posY, posY + 1]
      } else if (randomNumber == 3) {
        // console.log('direction is right')
        var maxX = posX
        while (maxX < maxDimension && markedData[`${maxX}-${posY}`] == 0) {
          maxX = maxX + 1
        }
        var maxDistance = Math.floor(Math.random() * 10) + 1
        var xRange = [posX, posX + maxDistance]
        var yRange = [posY, posY + 1]
      }

      if (xRange[1] != xRange[0] && yRange[1] != yRange[0]) {
        let color = getColor(xRange[0], yRange[0], maxDimension, maxDimension)
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
              markedData[`${i}-${j}`] == 'border'
            ) {
              markedData[`${i}-${j}`] = 'immediate_border'
            }
          }
        }

        // Creating the color strip
        for (let i = xRange[0]; i < xRange[1]; i++) {
          for (let j = yRange[0]; j < yRange[1]; j++) {
            if (
              markedData[`${i}-${j}`] !== undefined &&
              markedData[`${i}-${j}`] == 'immediate_border'
            ) {
              markedData[`${i}-${j}`] = `color-${color}`
            }
          }
        }
      }
      borderPixels = Object.keys(markedData).filter(
        (key) => markedData[key] == 'background'
      )

      if (borderPixels.length != 0) {
        // Pick a random item from this array;
        let randomBorderPixel = pullRandom(borderPixels)
        posX = parseInt(randomBorderPixel.split('-')[0])
        posY = parseInt(randomBorderPixel.split('-')[1])

        let stillGray: string[] = Object.keys(markedData).filter(
          (key) => markedData[key] == 'border'
        )
        stillGray.forEach((z) => (markedData[z] = 'background'))
        let newBorder: string[] = Object.keys(markedData).filter(
          (key) => markedData[key] == 'immediate_border'
        )
        newBorder.forEach((z) => (markedData[z] = 'white'))
      }
    }

    d3.select('#doublex').select('svg').remove()

    let svg = d3
      .select('#doublex')
      .append('svg')
      // @ts-ignore
      .attr('width', doublexRef.current.offsetWith)
      // @ts-ignore
      .attr('height', doublexRef.current.offsetWidth)
      .attr('viewBox', `0 0 ${maxDimension} ${maxDimension}`)
    // draw a svg grid of rectangles, black
    for (let i = 0; i < maxDimension; i++) {
      // markedData[i] = []
      for (let j = 0; j < maxDimension; j++) {
        let val = markedData[`${i}-${j}`]
        let fill = '#000'
        if (val == 'white') {
          fill = '#FFF'
        }
        if (val.match('color')) {
          fill = val.split('-')[1]
        }
        if (val.match('border')) {
          fill = 'red'
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
        <Grid item sm={3} xs={12}>
          <Button onClick={refresh} variant="contained">
            Refresh
          </Button>
        </Grid>
        <Grid item sm={9} xs={12} ref={doublexRef}>
          <div id="doublex"></div>
        </Grid>
      </Grid>
    </Box>
  )
}
