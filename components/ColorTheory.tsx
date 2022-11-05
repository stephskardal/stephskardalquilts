import * as React from 'react'
import * as d3 from 'd3'
import chroma from 'chroma-js'
import { Box, Button } from '@mui/material'
import { colorColorSorting } from '../functions/colorSortingFunc'

var fabricSwatches = {
  primaryColors: {
    label: 'Primary Colors',
    swatches: ['#FE2712', '#0247FE', '#FEFE33'],
    index: 0
  },
  secondaryColors: {
    label: 'With Secondary Colors',
    swatches: [
      '#FE2712',
      '#FF8000',
      '#FEFE33',
      '#66B032',
      '#0247FE',
      '#800080'
    ],
    index: 1
  },
  tertiaryColors: {
    index: 2,
    label: 'With Tertiary Colors',
    swatches: [
      '#FEFE33',
      '#FFC000',
      '#FF8000',
      '#FF4000',
      '#FE2712',
      '#BF1449',
      '#800080',
      '#55308D',
      '#0247FE',
      '#347C98',
      '#66B032',
      '#B2D733'
    ]
  },
  quaternaryColors: {
    index: 3,
    label: 'With Quaternary Colors',
    swatches: [
      '#FEFE33',
      '#FFE000',
      '#FFC000',
      '#FFA000',
      '#FF8000',
      '#FF6E00',
      '#FC4000',
      '#FF3300',
      '#FF0000',
      '#FF0040',
      '#BF1449',
      '#94006C',
      '#800080',
      '#8000C0',
      '#55308D',
      '#2C3BC6',
      '#0247FE',
      '#1B62CB',
      '#347C98',
      '#4D9665',
      '#66B032',
      '#8CC433',
      '#B2D733',
      '#D8F208'
    ]
  }
}

let buildSecondary = (buildFrom, buildTo, label, index) => {
  fabricSwatches[buildTo] = {
    label: label,
    swatches: [],
    index: index
  }
  var length = fabricSwatches[buildFrom].swatches.length - 1

  fabricSwatches[buildFrom].swatches.forEach((value, i) => {
    fabricSwatches[buildTo].swatches.push(value)
    var scalePos = i + 1
    if (i == length) {
      scalePos = 0
    }

    var chromaScale = chroma
      .scale([
        fabricSwatches[buildFrom].swatches[i],
        fabricSwatches[buildFrom].swatches[scalePos]
      ])
      .colors(3)
    fabricSwatches[buildTo].swatches.push(chromaScale[1])
  })
}

buildSecondary('quaternaryColors', 'quinaryColors', 'With Quinary Colors', 5)
buildSecondary('quinaryColors', 'senaryColors', 'With Senary Colors', 6)
buildSecondary('senaryColors', 'septenaryColors', 'With Septenary Colors', 7)

var Color = function Color(hexVal) {
  //define a Color class for the color objects
  this.hex = hexVal
}
let data

export default function ColorTheory() {
  let limitingDimension = 400
  let width = limitingDimension
  let height = limitingDimension
  let radius = Math.min(width, height) / 2 - 10
  const [selectedLine, setSelectedLine] =
    React.useState<string>('primaryColors')

  const changeLine = (el) => {
    setSelectedLine(el.target.value)
  }

  React.useEffect(() => {
    anotherWheel(data)
  }, [selectedLine])

  let otherPartition = (data) => {
    console.log(data)
    const root = d3.hierarchy(data).sum((d) => d.value)
    return d3.partition().size([2 * Math.PI, 5])(root)
  }

  const loadDataSet = () => {
    data = {
      height: 0,
      name: 'white',
      hex: '#FFFFFF',
      children: [],
      value: 0
    }

    fabricSwatches[selectedLine].swatches.forEach((swatch) => {
      var color = new Color(swatch)
      colorColorSorting.constructColor(color)
      color.value = 1
      data.children.push(color)
    })
  }
  const anotherWheel = (data) => {
    let arc = d3
      .arc()
      // @ts-ignore
      .startAngle((d) => d.x0)
      // @ts-ignore
      .endAngle((d) => d.x1)
      // @ts-ignore
      .innerRadius((d) => 100) //d.y0 * radius)
      // @ts-ignore
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius))

    const sunburstRoot = otherPartition(data)
    // @ts-ignore
    sunburstRoot.each((d) => (d.current = d))

    d3.select('#color-wheel-sunburst').select('svg').remove()

    let width = 2000

    const otherSvg = d3
      .select('#color-wheel-sunburst')
      .append('svg')
      .attr('viewBox', [0, 0, width, width])
      .style('font', '10px sans-serif')

    const otherG = otherSvg
      .append('g')
      .attr('transform', `translate(${width / 2},${width / 2})`)

    const otherPath = otherG
      .append('g')
      .selectAll('path')
      .data(sunburstRoot.descendants().slice(1))
      .join('path')
      // @ts-ignore
      .attr('fill', (d) => d.data.hex)
      // @ts-ignore
      .attr('d', (d) => arc(d.current))

    otherG
      .append('circle')
      .datum(sunburstRoot)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
  }

  loadDataSet()

  return (
    <Box sx={{ margin: '0px 20px' }}>
      <div id="color-wheel-sunburst"></div>
      {Object.keys(fabricSwatches)
        .sort((a, b) => {
          return fabricSwatches[a].index - fabricSwatches[b].index
        })
        .map((swatchKey) => {
          return (
            <Button
              key={swatchKey}
              size="small"
              sx={{ m: '0px 5px 5px 0px' }}
              onClick={changeLine}
              value={swatchKey}
              variant={selectedLine == swatchKey ? 'contained' : 'outlined'}
            >
              {fabricSwatches[swatchKey].label}
            </Button>
          )
        })}
    </Box>
  )
}
