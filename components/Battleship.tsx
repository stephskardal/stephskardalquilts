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

  let pullRandom = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  let getColor = (xPos, yPos, maxX, maxY) => {
    let distance: number = Math.sqrt(xPos * xPos + yPos * yPos)
    var scaledTo = Number.parseInt(
      // @ts-ignore
      (colors.length * distance) / Math.sqrt(maxX * maxY * 2)
    )
    return sortedColors[scaledTo]
  }

  const battleship = () => {
    let maxDimensionX: number = 10
    let maxDimensionY: number = 10

    var markedData = []
    for (var i = 0; i < maxDimensionX; i++) {
      for (let j = 0; j < maxDimensionY; j++) {
        markedData[`${i}-${j}`] = 'background'
      }
    }

    // from seed position
    // select up, down, left, or right
    let borderPixels = Object.keys(markedData).filter(
      (key) => markedData[key] == 'background'
    )

    var posX: number = 0 //maxDimensionX / 2;
    var posY: number = 0 //maxDimensionY / 2;
    for (let loop = 0; loop < 1; loop++) {
      //while (borderPixels.length > 0) {
      let randomNumber = Math.floor(Math.random() * 4)
      randomNumber = 1
      if (randomNumber == 0) {
        console.log('direction is up')
        var minY = posY
        while (minY > 1 && markedData[`${posX}-${minY}`] == 0) {
          minY -= 1
        }
        var maxDistance = posY - minY //Math.floor(Math.random() * (posY - minY)) + 1;
        var xRange = [posX, posX + 1]
        var yRange = [posY - maxDistance, posY]
      } else if (randomNumber == 1) {
        console.log('direction is down')
        var maxY = posY
        while (maxY < maxDimensionY && markedData[`${posX}-${maxY}`] == 0) {
          maxY = maxY + 1
        }
        var maxDistance = maxY - posY //Math.floor(Math.random() * (maxY - posY)) + 1;
        var xRange = [posX, posX + 1]
        var yRange = [posY, posY + maxDistance]
      } else if (randomNumber == 2) {
        console.log('direction is left')
        var minX = posX
        while (minX > 1 && markedData[`${minX}-${posY}`] == 0) {
          minX = minX - 1
        }
        var maxDistance = posX - minX //Math.floor(Math.random() * (posX - minX)) + 1;
        var xRange = [posX - maxDistance, posX + 1]
        var yRange = [posY, posY + 1]
      } else if (randomNumber == 3) {
        console.log('direction is right')
        var maxX = posX
        console.log('max x: ' + maxX)
        console.log('pos y: ' + posY)
        while (maxX < maxDimensionX && markedData[`${maxX}-${posY} `] == 0) {
          console.log('max x: ' + maxX)
          console.log('pos y: ' + posY)
          maxX = maxX + 1
        }
        let maxDistance = maxX - posX //Math.floor(Math.random() * (maxX - posX)) + 1;
        var xRange = [posX, posX + maxDistance]
        var yRange = [posY, posY + 1]
      }

      console.log('ranges: ')
      console.log(xRange)
      console.log(yRange)

      if (xRange[1] != xRange[0] && yRange[1] != yRange[0]) {
        // Retrieve color scaled
        // Setting all the border border
        for (let i = xRange[0] - 2; i < xRange[1] + 2; i++) {
          for (let j = yRange[0] - 2; j < yRange[1] + 2; j++) {
            if (
              markedData[`${i}-${j}`] !== undefined &&
              markedData[`${i}-${j}`] == 0
            ) {
              markedData[`${i}-${j}`] = 'border'
              // d3.select('.x-' + i + '-y-' + j).classed('gray', true)
            }
          }
        }

        console.log('bordering!')
        console.log(markedData)

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

        console.log('bordering!')
        console.log(markedData)

        // Creating the color strip
        for (let i = xRange[0]; i < xRange[1]; i++) {
          for (let j = yRange[0]; j < yRange[1]; j++) {
            if (
              markedData[`${i}-${j}`] !== undefined &&
              markedData[`${i}-${j}`] != 'color'
            ) {
              console.log('setting something to color')
              markedData[`${i}-${j}`] = 'color'
            }
          }
        }
        console.log('bordering!')
        console.log(markedData)

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

      console.log('border pixels')
      console.log(borderPixels)
      if (borderPixels.length != 0) {
        // Pick a random item from this array;
        let randomBorderPixel = pullRandom(borderPixels)
        console.log('PICKED')
        console.log(randomBorderPixel)
        posX = parseInt(randomBorderPixel.split('-')[0])
        posY = parseInt(randomBorderPixel.split('-')[1])

        let stillGray: string[] = Object.keys(markedData).filter(
          (key) => markedData[key] == 'border'
        )
        stillGray.forEach((z) => (markedData[z] = 'background'))
        console.log('new x and y is: ' + posX + ' ' + posY)
      }
    }

    d3.select('#battleship').select('svg').remove()

    var svg = d3
      .select('#battleship')
      .append('svg')
      .attr('width', 500) // maxDimensionX)
      .attr('height', 500) //maxDimensionY)
      .attr('viewBox', '0 0 10 10')
    // draw a svg grid of rectangles, black
    for (var i = 0; i < maxDimensionX; i++) {
      // markedData[i] = []
      for (let j = 0; j < maxDimensionY; j++) {
        let val = markedData[`${i}-${j}`]
        let fill = '#FFF'
        if (val == 'color') {
          fill = getColor(i, j, maxDimensionX, maxDimensionY)
        }
        console.log('fill is ' + fill)

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

  return <div id="battleship"></div>
}
