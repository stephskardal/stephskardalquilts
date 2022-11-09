import * as React from 'react'
import * as d3 from 'd3'
import { quickColorSorting } from '../functions/quickSortingFunc'

export default function ColorWheelFabricDistribution() {
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [sortedColors, setSortedColors] = React.useState<string[]>([])
  var colors = [
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
      //for (var i = 0; i < 0; i++) {
      //  var shifted = sortedColors.pop();
      //  sortedColors.unshift(shifted);
      // }
      setLoaded(true)
    }
  }, [])

  React.useEffect(() => {
    battleship()
  }, [sortedColors])

  const battleship = () => {
    let maxDimensionX: number = 20
    let maxDimensionY: number = 20
    d3.select('#battleship').select('svg').remove()

    var svg = d3
      .select('#battleship')
      .append('svg')
      .attr('width', 500) // maxDimensionX)
      .attr('height', 500) //maxDimensionY)
      .attr('viewBox', '0 0 10 10')

    var posX: number = 0 //maxDimensionX / 2;
    var posY: number = 0 //maxDimensionY / 2;
    var markedData = []

    // draw a svg grid of rectangles, black
    for (var i = 0; i < maxDimensionX; i++) {
      markedData[i] = []
      for (let j = 0; j < maxDimensionY; j++) {
        markedData[i][j] = 0

        svg
          .append('rect')
          .attr('width', 1)
          .attr('height', 1)
          .attr('x', i)
          .attr('y', j)
          .attr('class', 'x-' + i + '-y-' + j + ' black')
          .style('fill', 'black')
          .style('stroke', '#FFF')
          .style('stroke-width', '0.01px')
      }
    }

    // from seed position
    // select up, down, left, or right

    for (let loop = 0; loop < 10; loop++) {
      //while (d3.selectAll('.black').size() > 0) {
      var randomNumber = Math.floor(Math.random() * 4)
      if (randomNumber == 0) {
        // up
        var minY = posY
        while (minY > 1 && markedData[posX][minY] == 0) {
          minY -= 1
        }
        var maxDistance = posY - minY //Math.floor(Math.random() * (posY - minY)) + 1;
        var xRange = [posX, posX + 1]
        var yRange = [posY - maxDistance, posY]
      } else if (randomNumber == 1) {
        // down
        var maxY = posY
        while (maxY < maxDimensionY && markedData[posX][maxY] == 0) {
          maxY = maxY + 1
        }
        var maxDistance = maxY - posY //Math.floor(Math.random() * (maxY - posY)) + 1;
        var xRange = [posX, posX + 1]
        var yRange = [posY, posY + maxDistance]
      } else if (randomNumber == 2) {
        // left
        var minX = posX
        while (minX > 1 && markedData[minX][posY] == 0) {
          minX = minX - 1
        }
        var maxDistance = posX - minX //Math.floor(Math.random() * (posX - minX)) + 1;
        var xRange = [posX - maxDistance, posX + 1]
        var yRange = [posY, posY + 1]
      } else if (randomNumber == 3) {
        // right
        var maxX = posX
        while (maxX < maxDimensionX && markedData[maxX][posY] == 0) {
          maxX = maxX + 1
        }
        let maxDistance = maxX - posX //Math.floor(Math.random() * (maxX - posX)) + 1;
        var xRange = [posX, posX + maxDistance]
        var yRange = [posY, posY + 1]
      }

      // console.log(xRange)
      //console.log(yRange)

      let borderPixels
      if (xRange[1] != xRange[0] && yRange[1] != yRange[0]) {
        let distance: number = Math.sqrt(
          xRange[0] * xRange[0] + yRange[0] * yRange[0]
        )
        var scaledTo = Number.parseInt(
          // @ts-ignore
          (colors.length * distance) /
            Math.sqrt(maxDimensionX * maxDimensionY * 2)
        )
        var color = sortedColors[scaledTo]

        for (let i = xRange[0] - 2; i < xRange[1] + 2; i++) {
          for (let j = yRange[0] - 2; j < yRange[1] + 2; j++) {
            if (
              markedData[i] !== undefined &&
              markedData[i][j] !== undefined &&
              markedData[i][j] == 0
            ) {
              d3.select('.x-' + i + '-y-' + j).classed('gray', true)
            }
          }
        }

        for (let i = xRange[0] - 1; i < xRange[1] + 1; i++) {
          for (let j = yRange[0] - 1; j < yRange[1] + 1; j++) {
            if (
              markedData[i] !== undefined &&
              markedData[i][j] !== undefined &&
              markedData[i][j] != 1
            ) {
              d3.select('.x-' + i + '-y-' + j)
                .style('fill', 'white')
                .attr('class', 'x-' + i + '-y-' + j)
              markedData[i][j] = 2
            }
          }
        }

        for (let i = xRange[0]; i < xRange[1]; i++) {
          for (let j = yRange[0]; j < yRange[1]; j++) {
            if (
              markedData[i] !== undefined &&
              markedData[i][j] !== undefined &&
              markedData[i][j] != 1
            ) {
              d3.select('.x-' + i + '-y-' + j)
                .style('fill', color)
                .attr('class', 'x-' + i + '-y-' + j)
              markedData[i][j] = 1
            }
          }
        }
        borderPixels = d3.selectAll('.gray')
        if (borderPixels.size() == 0) {
          borderPixels = d3.selectAll('.black')
        }
      } else {
        borderPixels = d3.selectAll('.black')
      }

      console.log('border pixels')
      if (borderPixels.size() != 0) {
        var randomBorderPixel = Math.floor(Math.random() * borderPixels.size())
        console.log(Math.floor(Math.random() * borderPixels.size()))
        var picked = d3.select(borderPixels._groups[0][randomBorderPixel])
        console.log(picked)
        // @ts-ignore
        posX = picked.attr('x')
        // @ts-ignore
        posY = picked.attr('y')
        d3.selectAll('.gray').classed('gray', false).classed('black', true)
        console.log('new x and y is: ' + posX + ' ' + posY)
      }
    }
  }

  return <div id="battleship"></div>
}
