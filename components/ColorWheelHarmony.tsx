import * as React from 'react'
import * as d3 from 'd3'
import { Grid, Button, Typography, Box, Divider } from '@mui/material'
import { fabricSwatches } from '../public/custom_js/fabricSwatches'
import { colorColorSorting } from '../functions/colorSortingFunc'

let elId = '#color-wheel-harmony'

let originalOpacity = 0.4
let hexes =
  '#FEFE33,#ffef1a,#FFE000,#ffd000,#FFC000,#ffb000,#FFA000,#ff9000,#FF8000,#ff7700,#FF6E00,#fe5700,#FC4000,#fe3a00,#FF3300,#ff1a00,#FF0000,#ff0020,#FF0040,#df0a45,#BF1449,#aa0a5b,#94006C,#8a0076,#800080,#8000a0,#8000C0,#6b18a7,#55308D,#4136aa,#2C3BC6,#1741e2,#0247FE,#0f55e5,#1B62CB,#286fb2,#347C98,#41897f,#4D9665,#5aa34c,#66B032,#79ba33,#8CC433,#9fce33,#B2D733,#c5e51e,#D8F208,#ebf81e'.split(
    ','
  )
var harmonies = { complementary: {}, triadic: {}, analogous: {} }

/* Setting up harmonies */
hexes.forEach((el, i) => {
  if (i < 24) {
    harmonies.complementary[el] = hexes[i + 24]
  } else {
    harmonies.complementary[el] = hexes[i - 24]
  }
  if (i < 16) {
    harmonies.triadic[el] = hexes[i + 16] + ',' + hexes[i + 32]
  } else if (i >= 16 && i < 32) {
    harmonies.triadic[el] = hexes[i - 16] + ',' + hexes[i + 16]
  } else {
    harmonies.triadic[el] = hexes[i - 16] + ',' + hexes[i - 32]
  }
  if (i == 0) {
    harmonies.analogous[el] = hexes[47] + ',' + hexes[1]
  } else if (i < 47) {
    harmonies.analogous[el] = hexes[i - 1] + ',' + hexes[i + 1]
  } else if (i == 47) {
    harmonies.analogous[el] = hexes[0] + ',' + hexes[46]
  }
})

var Color = function Color(hexVal) {
  //define a Color class for the color objects
  this.hex = hexVal
}
let split = { colors: [] }
let data = {
  name: 'white',
  hex: '#FFFFFF',
  height: 0,
  children: []
}

export default function ColorWheelHarmony() {
  let width = 400
  let height = 400
  let radius = Math.min(width, height) / 2 - 10
  const [selectedHarmony, setSelectedHarmony] = React.useState<string>('Match')
  const [selectedLines, setSelectedLines] = React.useState<string[]>(
    Object.keys(fabricSwatches)
  )
  const [selectedFabrics, setSelectedFabrics] = React.useState<any[]>([])

  const changeHarmony = (el) => {
    setSelectedHarmony(el.target.value)
    setSelectedFabrics([])
  }

  const changeLine = (el) => {
    setSelectedFabrics([])
    // d3.selectAll(`${elId} path`).style('fill-opacity', originalOpacity);
    if (!selectedLines.includes(el.target.value)) {
      // if el.target.value is all, then uncheck all
      setSelectedLines([...selectedLines, el.target.value])
    } else {
      setSelectedLines(selectedLines.filter((p) => p != el.target.value))
    }
  }

  React.useEffect(() => {
    anotherWheel(data)
  }, [selectedLines, selectedHarmony])

  // Setting data
  data = {
    name: 'white',
    hex: '#FFFFFF',
    height: 0,
    children: []
  }

  let otherPartition = (data) => {
    const root = d3.hierarchy(data).sum((d) => d.lastValue)
    return d3.partition().size([2 * Math.PI, radius / 4])(root)
  }

  const loadDataSet = () => {
    split = {
      colors: []
    }
    hexes.forEach((el) => {
      var color = new Color(el)
      colorColorSorting.constructColor(color)
      color.name = 'Base: ' + el
      color.dist = 'Base'
      color.children = []
      split.colors.push(color)
    })

    Object.keys(fabricSwatches).forEach((swatchKey) => {
      if (selectedLines.includes(swatchKey)) {
        Object.keys(fabricSwatches[swatchKey].swatches).forEach((el) => {
          var color = new Color(fabricSwatches[swatchKey].swatches[el])
          colorColorSorting.constructColor(color)
          color.dist = fabricSwatches[swatchKey].label
          color.name = el
          color.children = []
          if (color.Saturation != 0 && color.Hue != 0) {
            split.colors.push(color)
          }
        })
      }
    })

    var clusters = {}
    split.colors.forEach((outer) => {
      if (outer.dist == 'Base') {
        clusters[outer.hex] = []
        data.children.push({
          name: outer.name,
          Hue: outer.Hue,
          hex: outer.hex,
          dist: outer.dist,
          children: []
        })
      }
    })

    split.colors.forEach((el) => {
      if (el.dist != 'Base') {
        var distance = 1000
        var closest = undefined
        data.children.forEach((dataPoint) => {
          if (Math.abs(dataPoint.Hue - el.Hue) < distance) {
            distance = Math.abs(dataPoint.Hue - el.Hue)
            closest = dataPoint
          }
        })
        if (closest !== undefined) {
          clusters[closest.hex].push({
            name: el.name,
            Hue: el.Hue,
            hex: el.hex,
            dist: el.dist,
            children: []
          })
        }
      }
    })

    data.children.forEach((el) => {
      if (clusters[el.hex].length > 0) {
        el.children = buildChildren(
          el.hex.replace(/#/, ''),
          colorColorSorting.sortColorsBy(clusters[el.hex], 'sat')
        )
      } else {
        el.children = [
          {
            name: 'N/A',
            size: 1,
            lastValue: 1,
            hex: '#FFFFFF',
            parentHex: el.hex.replace(/#/, ''),
            hue: el.hue,
            children: []
          }
        ]
      }
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
      .innerRadius((d) => d.y0 * radius)
      // @ts-ignore
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius))

    const sunburstRoot = otherPartition(data)
    // @ts-ignore
    sunburstRoot.each((d) => (d.current = d))

    d3.select(elId).select('svg').remove()

    let width = 20000

    const otherSvg = d3
      .select(elId)
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
      .attr('class', (d) => {
        // @ts-ignore
        return d.data.dist != 'Base'
          ? // @ts-ignore
            'hex-' + d.data.parentHex.replace(/^#/, '')
          : ''
      })
      .style('fill-opacity', originalOpacity)
      // @ts-ignore
      .attr('pointer-events', (d) => 'auto')
      // @ts-ignore
      .attr('d', (d) => arc(d.current))

    // @ts-ignore
    otherPath.style('cursor', 'pointer').on('click', clicked)

    otherG
      .append('circle')
      .datum(sunburstRoot)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('click', clicked)

    function clicked(event, p) {
      console.log(p.data)

      d3.selectAll(`${elId} path`).style('fill-opacity', originalOpacity)

      let selection

      console.log(selectedHarmony)

      if (selectedHarmony == 'Match') {
        selection = `${elId} .hex-` + p.data.parentHex.replace(/^#/, '')
      } else if (selectedHarmony == 'Complementary') {
        selection =
          `${elId} .hex-` +
          p.data.parentHex.replace(/^#/, '') +
          `,${elId} .hex-` +
          harmonies.complementary[`#${p.data.parentHex}`].replace(/^#/, '')
      } else {
        selection =
          `${elId} .hex-` +
          p.data.parentHex.replace(/^#/, '') +
          `, ${elId} .hex-` +
          harmonies[selectedHarmony.toLowerCase()][`#${p.data.parentHex}`]
            .split(',')[0]
            .replace(/^#/, '') +
          `, ${elId} .hex-` +
          harmonies[selectedHarmony.toLowerCase()][`#${p.data.parentHex}`]
            .split(',')[1]
            .replace(/^#/, '')
      }

      let labels = []
      d3.selectAll(selection)
        // @ts-ignore
        .transition(50)
        .style('fill-opacity', (d) => {
          // @ts-ignore
          if (d.data.name !== 'N/A') {
            // @ts-ignore
            var color = new Color(d.data.hex)
            colorColorSorting.constructColor(color)
            // @ts-ignore
            color.name = d.data.name
            labels.push(color)
          }
          return 1
        })

      let sortedColors = labels.sort((a, b) => {
        // Not sure if this is working
        return (
          b['Hue'] * 100 + b['Saturation'] - a['Hue'] * 100 - a['Saturation']
        )
      })
      setSelectedFabrics(sortedColors)
    }
  }

  loadDataSet()

  return (
    <Grid container spacing="2">
      <Grid item md={7} xs={12} sx={{ textAlign: 'center' }}>
        <div id="color-wheel-harmony"></div>
      </Grid>
      <Grid item md={2} xs={12}>
        <Typography component="h3">Harmony</Typography>
        {['Match', 'Complementary', 'Triadic', 'Analogous'].map((harmony) => {
          return (
            <Button
              size="small"
              sx={{ m: '0px 5px 5px 0px', display: 'block' }}
              value={harmony}
              onClick={changeHarmony}
              variant={selectedHarmony == harmony ? 'contained' : 'outlined'}
            >
              {harmony}
            </Button>
          )
        })}
        <Divider sx={{ mt: '20px' }} />
        <Typography component="h3" sx={{ mt: '10px' }}>
          Fabric Line
        </Typography>
        {Object.keys(fabricSwatches).map((swatchKey) => {
          return (
            <Button
              size="small"
              sx={{ m: '0px 5px 5px 0px', display: 'block' }}
              onClick={changeLine}
              value={swatchKey}
              variant={
                selectedLines.includes(swatchKey) ? 'contained' : 'outlined'
              }
            >
              {swatchKey}
            </Button>
          )
        })}
      </Grid>
      <Grid item md={1} xs={12}></Grid>
      <Grid item md={2} xs={12}>
        {selectedFabrics.length == 0 && (
          <Typography>
            Select your harmony type, solids, and then click on a color in the
            wheel.
          </Typography>
        )}
        {selectedFabrics.length > 0 && (
          <Typography component="h3">Results</Typography>
        )}
        {selectedFabrics.map((fabric) => {
          console.log(fabric)
          let textColor = '#000'
          if (fabric.Value < 0.8) {
            textColor = '#FFF'
          }
          return (
            <Box
              sx={{
                padding: '5px',
                backgroundColor: fabric.hex,
                color: textColor
              }}
            >
              {fabric.name}
            </Box>
          )
        })}
      </Grid>
    </Grid>
  )
}

var buildChildren = function (parentHex, children) {
  var firstEl = children.shift()
  if (children.length > 1) {
    return [
      {
        name: firstEl.name,
        size: 1,
        lastValue: 0,
        dist: firstEl.dist,
        hex: firstEl.hex,
        parentHex: parentHex,
        children: buildChildren(parentHex, children)
      }
    ]
  } else {
    return [
      {
        name: firstEl.name,
        size: 0,
        dist: firstEl.dist,
        parentHex: parentHex,
        lastValue: 1,
        hex: firstEl.hex
      }
    ]
  }
}
