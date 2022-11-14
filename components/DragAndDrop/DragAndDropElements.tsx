import Shuffle from 'functions/shuffle'
import { SwatchItem } from 'types/types'
import { colorColorSorting } from 'functions/colorSortingFunc'
import { Box } from '@mui/material'
import styles from 'components/DragAndDrop/DragAndDrop.module.css'

var Color = function Color(hexVal: string) {
  this.hex = hexVal
}

const listElement = (name: string, hex: string, value: number) => {
  let textColor: string = value > 0.7 ? '#000000' : '#FFFFFF'
  return (
    <Box
      className={styles.item}
      sx={{ backgroundColor: hex, color: textColor }}
    >
      <Box>
        <div>{name}</div>
        <div>{value}</div>
      </Box>
    </Box>
  )
}

export const generateRandomColors = (swatches) => {
  let swatchList: SwatchItem[] = Object.keys(swatches).map((key) => {
    let c = new Color(swatches[key])
    colorColorSorting.constructColor(c)
    return {
      name: key,
      sortField: c.Value,
      hex: swatches[key],
      value: c.Value.toFixed(3)
    }
  })
  let randomPull = Shuffle.shuffle(swatchList).slice(0, 10)
  let winningSort = randomPull.sort((a, b) => b.sortField - a.sortField)
  let newList = Shuffle.shuffle(
    winningSort.map((item, index) => {
      return {
        name: item.name,
        hex: item.hex,
        order: index,
        winningOrder: index,
        value: item.value
      }
    })
  ).map((item, index) => {
    return {
      id: item.name,
      element: listElement(item.name, item.hex, item.value),
      order: index,
      winningOrder: item.winningOrder,
      value: item.value
    }
  })
  return newList
}
