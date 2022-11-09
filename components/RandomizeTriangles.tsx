import * as React from 'react'
import { Divider, Tooltip, Box, Grid, Button, Typography } from '@mui/material'
import * as d3 from 'd3'
import { fabricSwatches } from 'public/custom_js/fabricSwatches'
import { colorColorSorting } from 'functions/colorSortingFunc'

export default function RandomizeTriangles() {
  const gridRef = React.useRef()
  const [selectedLine, setSelectedLine] = React.useState<string>('kona')
  let colorKeys = Object.keys(fabricSwatches[selectedLine].swatches)
  const [colorValues, setColorValues] = React.useState([
    { label: colorKeys[0], value: 1 },
    { label: colorKeys[10], value: 1 },
    { label: colorKeys[20], value: 1 },
    { label: colorKeys[30], value: 1 }
  ])

  const subtractFromPie = (color: string) => {
    let updatedColorValues = []
    colorValues.forEach((z) => {
      if (z.label == color) {
        if (z.value > 1) {
          updatedColorValues.push({ label: z.label, value: z.value - 1 })
        }
      } else {
        updatedColorValues.push(z)
      }
    })
    setColorValues(updatedColorValues)
  }

  const regenerate = () => {
    drawGrid()
  }

  const addToPie = (el) => {
    let color = el.target.getAttribute('data-color')

    let updatedColorValues = []
    let found: boolean = false
    colorValues.forEach((z) => {
      if (z.label == color) {
        found = true
        updatedColorValues.push({ label: z.label, value: z.value + 1 })
      } else {
        updatedColorValues.push(z)
      }
    })
    if (!found) {
      updatedColorValues.push({ label: color, value: 1 })
    }
    setColorValues(updatedColorValues)
  }

  React.useEffect(() => {
    drawGrid()
    drawChart()
  }, [colorValues])

  function drawGrid() {
    // Remove the old svg
    d3.select('#grid-container').select('svg').remove()

    let screenWidth = 600 // get width
    var svg = d3
      .select('#grid-container')
      .append('svg')
      .attr('width', screenWidth)
      .attr('height', screenWidth)
      .attr('viewBox', '0 0 ' + screenWidth + ' ' + screenWidth)
      .attr('preserveAspectRatio', 'xMinYMin')

    var colors = []
    colorValues.forEach((color) => {
      for (var i = 0; i < color.value; i++) {
        colors.push(fabricSwatches[selectedLine].swatches[color.label])
      }
    })

    var trianglePoints = randomize.allTheTriangles()
    var size = trianglePoints.length
    for (var i = 0; i < 1000; i++) {
      var randomNumber = Math.floor(Math.random() * size)
      var colorIndex = Math.floor(Math.random() * colors.length)
      var pointSet = trianglePoints[randomNumber].split(':')[0]
      var sizeClass = 'size-' + trianglePoints[randomNumber].split(':')[1]
      svg
        .append('polygon')
        .attr('points', pointSet)
        .attr('fill', colors[colorIndex])
        .attr('class', 'random ' + sizeClass)
    }
    for (var i = 12; i > 1; i -= 1) {
      d3.selectAll('.size-' + i).each(function (a) {
        // @ts-ignore
        d3.select(this).moveToFront()
      })
    }
  }

  function drawChart() {
    let width = 150
    let height = 150
    let innerRadius = 0
    let outerRadius = 75
    // Remove the old svg
    d3.select('#pie-container').select('svg').remove()

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      // @ts-ignore
      .value((d) => d.value)

    const arc = svg
      .selectAll()
      // @ts-ignore
      .data(pieGenerator(colorValues))
      .enter()

    // Append arcs
    arc
      .append('path')
      // @ts-ignore
      .attr('d', arcGenerator)
      // @ts-ignore
      .style('fill', (i) => fabricSwatches[selectedLine].swatches[i.data.label])
      .style('stroke', '#ffffff')
      .style('stroke-width', 0)
      .on('click', (e, el) => {
        // @ts-ignore
        subtractFromPie(el.data.label)
      })
  }

  const changeLine = (el) => {
    // @ts-ignore
    setSelectedLine(el.target.value)
    console.log('switching to: ' + el.target.value)
    let colorKeys = Object.keys(fabricSwatches[el.target.value].swatches)
    setColorValues([
      { label: colorKeys[0], value: 1 },
      { label: colorKeys[10], value: 1 },
      { label: colorKeys[20], value: 1 },
      { label: colorKeys[30], value: 1 }
    ])
  }

  var randomize = {
    randomSize: function () {
      return 12
    },
    randomSquareSize: function () {
      // @ts-ignore
      return gridRef.current.offsetWidth / 13
    },
    allTheTriangles: function () {
      var points = []
      var squareSize = randomize.randomSquareSize()
      for (var size = 1; size <= randomize.randomSize(); size++) {
        for (var col = 0; col < randomize.randomSize(); col++) {
          for (var row = 0; row < randomize.randomSize(); row++) {
            if (
              col + size <= randomize.randomSize() &&
              row + size <= randomize.randomSize()
            ) {
              var topLeft = col * squareSize + ',' + row * squareSize
              var topRight = (col + size) * squareSize + ',' + row * squareSize
              var bottomRight =
                (col + size) * squareSize + ',' + (row + size) * squareSize
              var bottomLeft =
                col * squareSize + ',' + (row + size) * squareSize
              points.push(
                topLeft + ' ' + topRight + ' ' + bottomRight + ':' + size
              )
              points.push(topLeft + ' ' + topRight + ' ' + bottomLeft) +
                ':' +
                size
              points.push(
                bottomLeft + ' ' + topRight + ' ' + bottomRight + ':' + size
              )
              points.push(
                topLeft + ' ' + bottomLeft + ' ' + bottomRight + ':' + size
              )
            }
          }
        }
      }
      return points
    },
    save: function (dataBlob, filesize) {
      // let svg = d3.select('#grid-container').select('svg');
      // var svgString = getSVGString(svg.node());
      // svgString2Image( svgString, 2*svg.attr('width'), 2*svg.attr('height'), 'png', randomize.save );
      // saveAs(dataBlob, 'exported.png');
    }
  }

  let sortedColors = colorColorSorting.sortColorsBy(
    Object.keys(fabricSwatches[selectedLine].swatches),
    'Hue'
  )

  return (
    <Grid container spacing="2">
      <Grid md={7} xs={12} ref={gridRef} sx={{ mb: '20px' }}>
        <div id="grid-container"></div>
        <Typography sx={{ mt: '10px' }}>Colors</Typography>
        {colorValues.map((color) => {
          return (
            <Typography>
              {fabricSwatches[selectedLine].label}: {color.label} ({color.value}
              )
            </Typography>
          )
        })}
      </Grid>
      <Grid md={5} xs={12}>
        <Button variant="contained" onClick={regenerate} size="small">
          Regenerate
        </Button>
        {false && <Button variant="contained">Download</Button>}
        <Divider sx={{ m: '20px 0px' }} />
        <Typography component="h3">The Color Pie</Typography>
        <Typography>
          Update your color pie and click 'Re-generate' to create a random
          design. Best supported on a desktop/laptop (the save functionality is
          not supported by up to date iPhones). Read more details about this
          blog post below!
        </Typography>
        <div id="pie-container"></div>
        <Divider sx={{ m: '20px 0px' }} />
        {Object.keys(fabricSwatches).map((swatchKey) => {
          return (
            <Button
              size="small"
              sx={{ m: '0px 5px 5px 0px' }}
              onClick={changeLine}
              value={swatchKey}
              variant={selectedLine == swatchKey ? 'contained' : 'outlined'}
            >
              {swatchKey}
            </Button>
          )
        })}
        <Divider sx={{ m: '20px 0px' }} />
        {sortedColors.map((swatchKey) => {
          return (
            <Tooltip title={swatchKey}>
              <Box
                component="span"
                onClick={addToPie}
                data-color={swatchKey}
                sx={{
                  mr: '5px',
                  backgroundColor:
                    fabricSwatches[selectedLine].swatches[swatchKey],
                  height: '30px',
                  width: '30px',
                  display: 'inline-block'
                }}
              ></Box>
            </Tooltip>
          )
        })}
      </Grid>
    </Grid>
  )
}

d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this)
  })
}
d3.selection.prototype.moveToBack = function () {
  return this.each(function () {
    var firstChild = this.parentNode.firstChild
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild)
    }
  })
}
