import * as React from 'react'
import * as d3 from 'd3'
import { Typography, Grid, Divider, Button } from '@mui/material'
import { scaleSqrt, scaleLinear } from 'd3-scale'
import { fabricSwatches } from '../public/custom_js/fabricSwatches'
import { colorColorSorting } from '../functions/colorSortingFunc'

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
let ringKey = 'Saturation'
let x = scaleLinear().range([0, 2 * Math.PI])
let y = scaleSqrt().range([0, 500])

export default function ColorWheel() {
  let limitingDimension = 400
  let width = limitingDimension
  let height = limitingDimension
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
  let colors = []
  Object.keys(fabricSwatches).forEach((key) => {
    let swatchData = fabricSwatches[key]
    if (selectedLines.includes(key)) {
      Object.keys(swatchData.swatches).forEach((i) => {
        let color = new Color(swatchData.swatches[i])
        colorColorSorting.constructColor(color)
        color.name = i
        color.children = []
        color.dist = swatchData.label

        if (color.Saturation == 0 && color.Hue == 0) {
          color.Saturation = 1 - color.Value
          grayscales.push(color)
        } else {
          colors.push(color)
        }
      })
    }
  })
  split = {
    colors: colors
  }
  loadDataSet()

  let otherPartition = (data) => {
    const root = d3.hierarchy(data).sum((d) => 1)
    return d3.partition().size([2 * Math.PI, root.height])(root)
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
      console.log(p)
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

  return (
    <Grid container spacing="2">
      <Grid item md={8} xs={12}>
        <div id="color-wheel-sunburst"></div>
        {zoomLabel == undefined && (
          <Button size="small">Click a color to expand a section</Button>
        )}
        {zoomLabel !== undefined && (
          <>
            <Button size="small" onClick={refreshCenter}>
              Refresh
            </Button>
            <Button sx={{ background: zoomHex }}> </Button>
            <Button>{zoomLabel}</Button>
          </>
        )}
      </Grid>
      <Grid item md={4} xs={12}>
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

        <Divider sx={{ mt: '15px', mb: '10px' }} />
        <Typography component="h3">Grayscale Fabrics</Typography>
        {grayscales.map((grayscale) => {
          let labelString: string = grayscale.dist + ' ' + grayscale.name
          let textColor: string = '#000'
          if (grayscale.Value < 0.7) {
            textColor = '#FFFFFF'
          }
          return (
            <Button
              size="small"
              sx={{
                background: grayscale.hex,
                border: '1px solid #000',
                color: textColor,
                padding: '5px 10px',
                marginBottom: '5px',
                '&:hover': {
                  backgroundColor: grayscale.hex
                }
              }}
            >
              {labelString}
            </Button>
          )
        })}
      </Grid>
    </Grid>
  )
}

const loadDataSet = () => {
  split.colors.forEach((outer) => {
    if (outer[ringKey] > 0.75) {
      data.children.push({
        name: outer.name,
        Hue: outer.Hue,
        hex: outer.hex,
        dist: outer.dist,
        children: []
      })
    }
  })
  data.children = colorColorSorting.sortColorsBy(data.children, 'Hue')

  //Second layer
  split.colors.forEach((el) => {
    if (el[ringKey] > 0.5 && el[ringKey] <= 0.75) {
      let distance = 1000
      let closest = undefined
      data.children.forEach((dataPoint) => {
        if (Math.abs(dataPoint.Hue - el.Hue) < distance) {
          distance = Math.abs(dataPoint.Hue - el.Hue)
          closest = dataPoint
        }
      })
      // This doesn't see mto be doing anything
      if (closest !== undefined) {
        closest.children.push({
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
    if (el.children.length == 0) {
      el.children = [
        {
          name: 'N/A',
          size: 10,
          hex: '#FFFFFF',
          Hue: el.Hue,
          dist: el.dist,
          children: []
        }
      ]
    } else {
      el.children = colorColorSorting.sortColorsBy(el.children, 'Hue')
    }
  })

  //Third layer
  split.colors.forEach((el) => {
    if (el[ringKey] > 0.25 && el[ringKey] <= 0.5) {
      let distance = 1000
      let closest = undefined
      data.children.forEach((dataPoint) => {
        dataPoint.children.forEach((lowerDataPoint) => {
          if (Math.abs(lowerDataPoint.Hue - el.Hue) < distance) {
            distance = Math.abs(lowerDataPoint.Hue - el.Hue)
            closest = lowerDataPoint
          }
        })
      })
      el.size = 10
      closest.children.push({
        name: el.name,
        Hue: el.Hue,
        hex: el.hex,
        dist: el.dist,
        children: []
      })
    }
  })

  data.children.forEach((el) => {
    el.children.forEach((lowerEl) => {
      if (lowerEl.children.length == 0) {
        lowerEl.children = [
          {
            name: 'N/A',
            //size: 10,
            hex: '#FFFFFF',
            hue: lowerEl.Hue,
            dist: el.dist,
            children: []
          }
        ]
      } else {
        lowerEl.children = colorColorSorting.sortColorsBy(
          lowerEl.children,
          'Hue'
        )
      }
    })
  })

  //Fourth layer
  split.colors.forEach((el) => {
    if (el[ringKey] <= 0.25) {
      let distance = 1000
      let closest = undefined
      data.children.forEach((dataPoint) => {
        dataPoint.children.forEach((lowerDataPoint) => {
          lowerDataPoint.children.forEach((anotherDataPoint) => {
            if (Math.abs(anotherDataPoint.Hue - el.Hue) < distance) {
              distance = Math.abs(anotherDataPoint.Hue - el.Hue)
              closest = anotherDataPoint
            }
          })
        })
      })
      if (closest !== undefined) {
        closest.children.push({
          name: el.name,
          Hue: el.Hue,
          hex: el.hex,
          value: 1,
          children: []
        })
      }
    }
  })

  //Set all sizes
  data.children.forEach((el) => {
    el.children.forEach((lowerEl) => {
      lowerEl.children.forEach((anotherEl) => {
        if (anotherEl.children.length == 0) {
          anotherEl.children = [
            {
              name: 'N/A',
              size: 10,
              value: 1,
              hex: anotherEl.hex,
              hue: anotherEl.Hue,
              children: []
            }
          ]
        } else {
          anotherEl.children = colorColorSorting.sortColorsBy(
            anotherEl.children,
            'Hue'
          )
        }
      })
    })
  })
}
