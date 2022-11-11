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
    let maxDimension: number = 20
    let diagonalDistance: number = Math.sqrt(2 * maxDimension * maxDimension)
    var posX: number = 0 //maxDimension / 2;
    var posY: number = 0 //maxDimension / 2;
    var markedData = []

    // draw a svg grid of rectangles, black
    for (let i = 0; i < maxDimension; i++) {
      markedData[i] = []
      for (let j = 0; j < maxDimension; j++) {
        markedData[i][j] = 0
      }
    }

    // @ts-ignore
    let triangleCenter: number = parseInt(maxDimension / 2);

    [50, 40, 30, 20, 10].forEach((triangleHeight) => {
      var fill = 'white'
      var className = ' filled-white'
      var dataToSet = 1
      if (triangleHeight % 20 == 0) {
        fill = 'black'
        className = ' black'
        dataToSet = 0
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
          markedData[i][j] = dataToSet
          markedData[j][i] = dataToSet
          d3.select('.x-' + i + '-y-' + j)
            .style('fill', fill)
            .attr('class', 'x-' + i + '-y-' + j + className)

          var flippedY = maxDimension - j
          markedData[i][flippedY] = dataToSet
          d3.select('.x-' + i + '-y-' + flippedY)
            .style('fill', fill)
            .attr('class', 'x-' + i + '-y-' + flippedY + className)
          d3.select('.x-' + j + '-y-' + i)
            .style('fill', fill)
            .attr('class', 'x-' + j + '-y-' + i + className)

          var flippedX = maxDimension - j
          if (flippedX != maxDimension) {
            markedData[flippedX][i] = dataToSet
            d3.select('.x-' + flippedX + '-y-' + i)
              .style('fill', fill)
              .attr('class', 'x-' + flippedX + '-y-' + i + className)
          }
        }
      }
    })

    /*
    //for(var loop = 0; loop < 3; loop++) {
    while (d3.selectAll('.black').size() > 0) {
      var randomNumber = Math.floor(Math.random() * 4);
      if (randomNumber == 0) { // up
        var minY = posY;
        while (minY > 1 && markedData[posX][minY] == 0) {
          minY -= 1;
        }
        var maxDistance = posY - minY; //Math.floor(Math.random() * (posY - minY)) + 1;
        var xRange = [parseInt(posX), parseInt(posX) + 1];
        var yRange = [parseInt(posY) - maxDistance, parseInt(posY)];
      } else if (randomNumber == 1) { // down
        var maxY = posY;
        while (maxY < maxDimension && markedData[posX][maxY] == 0) {
          maxY = parseInt(maxY) + 1;
        }
        var maxDistance = maxY - posY; //Math.floor(Math.random() * (maxY - posY)) + 1;
        var xRange = [parseInt(posX), parseInt(posX) + 1];
        var yRange = [parseInt(posY), parseInt(posY) + maxDistance];
      } else if (randomNumber == 2) { // left
        var minX = posX;
        while (minX > 1 && markedData[minX][posY] == 0) {
          minX = parseInt(minX) - 1;
        }
        var maxDistance = posX - minX; //Math.floor(Math.random() * (posX - minX)) + 1;
        var xRange = [parseInt(posX) - parseInt(maxDistance), parseInt(posX) + 1];
        var yRange = [parseInt(posY), parseInt(posY) + 1];
      } else if (randomNumber == 3) { // right
        var maxX = posX;
        while (maxX < maxDimension && markedData[maxX][posY] == 0) {
          maxX = parseInt(maxX) + 1;
        }
        var maxDistance = maxX - posX; //Math.floor(Math.random() * (maxX - posX)) + 1;
        var xRange = [parseInt(posX), parseInt(posX) + parseInt(maxDistance)];
        var yRange = [parseInt(posY), parseInt(posY) + 1];
      }

      var borderPixels;
      if (xRange[1] != xRange[0] && yRange[1] != yRange[0]) {
        var xdistance = xRange[0]; //(maxDimension/2 - xRange[0]);
        var ydistance = maxDimension - yRange[0]; //(maxDimension/2 - xRange[0]);
        var distance = Math.sqrt(xdistance * xdistance + ydistance * ydistance);
        var scaledTo = parseInt(parseFloat(colors.length) * parseFloat(distance) / diagonalDistance);
        //var color = '#FFFFFF'; //sortedColors[scaledTo];
        var color = sortedColors[scaledTo];

        for (i = xRange[0] - 2; i < xRange[1] + 2; i++) {
          for (j = yRange[0] - 2; j < yRange[1] + 2; j++) {
            if (markedData[i] !== undefined && markedData[i][j] !== undefined && markedData[i][j] == 0) {
              d3.select('.x-' + i + '-y-' + j).classed('gray', true);
            }
          }
        }

        for (i = xRange[0] - 1; i < xRange[1] + 1; i++) {
          for (j = yRange[0] - 1; j < yRange[1] + 1; j++) {
            if (markedData[i] !== undefined && markedData[i][j] !== undefined && markedData[i][j] != 1) {
              d3.select('.x-' + i + '-y-' + j).style('fill', 'white').attr('class', 'x-' + i + '-y-' + j + ' filled-white');
              markedData[i][j] = 2;
            }
          }
        }

        for (i = xRange[0]; i < xRange[1]; i++) {
          for (j = yRange[0]; j < yRange[1]; j++) {
            if (markedData[i] !== undefined && markedData[i][j] !== undefined && markedData[i][j] != 1) {
              d3.select('.x-' + i + '-y-' + j).style('fill', color).attr('class', 'x-' + i + '-y-' + j).attr('stroke', 'black').attr('stroke-width', '0.01px');
              markedData[i][j] = 1;
            }
          }
        }
        borderPixels = d3.selectAll('.gray');
        if (borderPixels.size() == 0) {
          borderPixels = d3.selectAll('.black');
        }
      } else {
        borderPixels = d3.selectAll('.black');
      }

      if (borderPixels.size() != 0) {
        var randomBorderPixel = Math.floor(Math.random() * borderPixels.size());
        var picked = d3.select(borderPixels[0][randomBorderPixel]);
        posX = picked.attr('x');
        posY = picked.attr('y');
        d3.selectAll('.gray').classed('gray', false).classed('black', true);
        //console.log('new x and y is: ' + posX + ' ' + posY);
      }
    }
    $('rect.filled-white').remove();
    console.log($('rect').length);

    var factor = 40;
    for (var i = 0; i < maxDimension; i++) {
      for (j = 0; j < maxDimension; j++) {
        d3.select('.x-' + i + '-y-' + j).attr('height', factor).attr('width', factor).attr('x', i * factor).attr('y', j * factor);
      }
    }

    // SVG viewport
    var svg = d3.select('body')
      .select('#doublex')
      .append('svg')
      .attr('id', 'color-me-svg')
      .attr('width', maxDimension)
      .attr('height', maxDimension)
      .attr('viewBox', '0 0 ' + maxDimension + ' ' + maxDimension);

    /// Need to loop through

    d3.select('svg').attr('width', maxDimension * factor).attr('height', maxDimension * factor)
      .attr('viewBox', '0 0 ' + maxDimension * factor + ' ' + maxDimension * factor).style('fill', '#FFFFFF');
    */
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
