import * as React from 'react'
import * as d3 from 'd3'
import { Grid, Button, Typography } from '@mui/material'
import { fabricSwatches } from 'public/fabricSwatches'
import { colorColorSorting } from 'functions/colorSortingFunc'

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

export default function ColorWheelFabricDistribution() {
  let width = 400
  let height = 400
  let radius = Math.min(width, height) / 2 - 10
  const [selectedLines, setSelectedLines] = React.useState<string[]>(
    Object.keys(fabricSwatches)
  )
  const [zoomLabel, setZoomLabel] = React.useState<string>(undefined)
  const [zoomHex, setZoomHex] = React.useState<string>(undefined)

  const changeLine = (el) => {
    if (!selectedLines.includes(el.target.value)) {
      // if el.target.value is all, then uncheck all
      setSelectedLines([...selectedLines, el.target.value])
    } else {
      setSelectedLines(selectedLines.filter((p) => p != el.target.value))
    }
  }

  React.useEffect(() => {
    anotherWheel(data)
  }, [selectedLines])

  let refreshCenter = () => {
    setZoomLabel(undefined)
    anotherWheel(data)
  }

  // Setting data
  data = {
    name: 'white',
    hex: '#FFFFFF',
    height: 0,
    children: []
  }

  let grayscales = []

  let otherPartition = (data) => {
    const root = d3.hierarchy(data).sum((d) => d.lastValue)
    return d3.partition().size([2 * Math.PI, radius / 4])(root)
  }

  const loadDataSet = () => {
    split = {
      colors: []
    }
    ;[
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
    ].forEach((el) => {
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
          colorColorSorting.sortColorsBy(clusters[el.hex], 'sat')
        )
      } else {
        el.children = [
          {
            name: 'N/A',
            size: 1,
            lastValue: 1,
            hex: '#FFFFFF',
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

    d3.select('#color-wheel-sunburst').select('svg').remove()

    let width = 20000

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
      .style('fill-opacity', function (d) {
        // @ts-ignore
        return d.data.dist == 'Base' ? 0.3 : 1.0
      })
      // @ts-ignore
      .attr('pointer-events', (d) => 'auto')
      // @ts-ignore
      .attr('d', (d) => arc(d.current))

    // @ts-ignore
    // otherPath.style('cursor', 'pointer').on('click', clicked)

    otherG
      .append('circle')
      .datum(sunburstRoot)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
    //   .on('click', clicked)

    function clicked(event, p) {
      if (p.name == 'N/A' && p.children === undefined) {
        return
      }
      if (
        p.name == 'N/A' &&
        p.children.length == 1 &&
        p.children[0].hex == '#FFFFFF'
      ) {
        return
      }

      if (p.data.name != 'N/A' && p.data.name != 'white') {
        var labelString = p.data.dist + ' ' + p.data.name
        setZoomLabel(labelString)
        setZoomHex(p.data.hex)
      } else {
        setZoomLabel(undefined)
      }

      // otherParent.datum(p.parent || sunburstRoot)

      // @ts-ignore
      sunburstRoot.each(
        (d) =>
          // @ts-ignore
          (d.target = {
            x0:
              Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            x1:
              Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) *
              2 *
              Math.PI,
            y0: Math.max(0.3, d.y0 - p.depth),
            // y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - 0)
          })
      )

      const t = otherG.transition().duration(750)

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      otherPath
        .transition(t)
        .tween('data', (d) => {
          // @ts-ignore
          const i = d3.interpolate(d.current, d.target)
          // @ts-ignore
          return (t) => (d.current = i(t))
        })
        // @ts-ignore
        .attr('pointer-events', 'auto')
        // @ts-ignore
        .attrTween('d', (d) => () => arc(d.current))
    }
  }

  loadDataSet()

  return (
    <Grid container spacing="2">
      <Grid item md={9} xs={12}>
        {zoomLabel !== undefined && (
          <>
            <Button onClick={refreshCenter}>Refresh</Button>
            <Button sx={{ background: zoomHex }}> </Button>
            <Button>{zoomLabel}</Button>
          </>
        )}
        <div id="color-wheel-sunburst"></div>
      </Grid>
      <Grid item md={3} xs={12}>
        <Typography component="h3">Fabric Lines</Typography>
        {Object.keys(fabricSwatches).map((swatchKey) => {
          return (
            <Button
              size="small"
              sx={{ m: '0px 5px 5px 0px' }}
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
    </Grid>
  )
}

var buildChildren = function (children) {
  var firstEl = children.shift()
  if (children.length > 1) {
    return [
      {
        name: firstEl.name,
        size: 1,
        lastValue: 0,
        dist: firstEl.dist,
        hex: firstEl.hex,
        children: buildChildren(children)
      }
    ]
  } else {
    return [
      {
        name: firstEl.name,
        size: 0,
        dist: firstEl.dist,
        lastValue: 1,
        hex: firstEl.hex
      }
    ]
  }
}
