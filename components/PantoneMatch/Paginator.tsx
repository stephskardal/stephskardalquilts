import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { Pagination, Typography, Grid, Box, TextField } from '@mui/material'
import { fabricSwatches } from 'public/fabricSwatches'
import chroma from 'chroma-js'
import styles from './PantoneMatch.module.css'

export interface PaginatorProps {
  colors: any[]
}

const getMatch = (color) => {
  let existingColor = chroma(fabricSwatches.pantone.swatches[color])
  let colorByDistance = []
  Object.keys(fabricSwatches).forEach((swatch) => {
    if (swatch !== 'pantone') {
      Object.keys(fabricSwatches[swatch].swatches).forEach((swatchKey) => {
        var distance = chroma.distance(
          fabricSwatches[swatch].swatches[swatchKey],
          existingColor
        )
        colorByDistance.push({
          key: fabricSwatches[swatch].label,
          hex: fabricSwatches[swatch].swatches[swatchKey],
          swatchKey: swatchKey,
          distance: distance
        })
      })
    }
  })

  return {
    color: color,
    matches: colorByDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 12)
  }
}

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  const maxPage = Math.ceil(data.length / itemsPerPage)

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  function jump(page) {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentData, currentPage, maxPage }
}

export default function Paginator(props: PaginatorProps) {
  const theme = useTheme()

  let [page, setPage] = React.useState<number>(1)
  let [searchTerm, setSearchTerm] = React.useState<string>('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearchTerm(event.target.value)
  }

  const filterColors = (colors: string[]) => {
    return colors
      .filter((color) => {
        return color.toLowerCase().match(searchTerm.toLowerCase())
      })
      .sort()
  }

  let sortedColors = filterColors(props.colors)

  const count: number = Math.ceil(sortedColors.length / 10)
  const _DATA = usePagination(sortedColors, 10)

  const handleChange = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }

  const paginationBit = (count: number, page: number, position: string) => {
    if (count > 1) {
      return (
        <Pagination
          color="primary"
          variant="outlined"
          count={count}
          page={page}
          onChange={handleChange}
        />
      )
    } else {
      return
    }
  }

  return (
    <>
      <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
        <Box sx={{ mb: '20px' }}>{paginationBit(count, page, 'top')}</Box>
        <Box sx={{ mb: '30px' }}>
          <TextField
            sx={{ width: '100%' }}
            size="small"
            value={searchTerm}
            label="Search Pantone Color"
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ mb: '20px', display: { sm: 'flex', xs: 'none' } }}
      >
        <Grid sm={6} xs={12}>
          {paginationBit(count, page, 'top')}
        </Grid>
        <Grid sm={6} xs={12} className={styles.searchField}>
          <TextField
            sx={{ width: '100%' }}
            size="small"
            value={searchTerm}
            label="Search Pantone Color"
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
      {_DATA.currentData().map((color, index) => {
        let z = getMatch(color)
        return (
          <Box className={styles.resultWrapper}>
            <Box className={styles.pantoneBoxWrapper}>
              <Typography component="div">{z.color}</Typography>
              <Box
                className={styles.pantoneBox}
                sx={{
                  backgroundColor: fabricSwatches.pantone.swatches[z.color]
                }}
              ></Box>
            </Box>
            <Grid container className={styles.resultsWrapper}>
              {z.matches.map((y) => {
                return (
                  <Grid item md={4} xs={12} className={styles.matchWrapper}>
                    <Box
                      className={styles.miniMatch}
                      sx={{
                        backgroundColor: y.hex
                      }}
                    ></Box>
                    <Box>
                      {y.key} {y.swatchKey}
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )
      })}
    </>
  )
}
