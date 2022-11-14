import * as React from 'react'
import { Button, Grid, Box } from '@mui/material'
import { fabricSwatches } from 'public/fabricSwatches'
import FabricButtons from 'components/FabricButtons'
import { ListManager } from 'react-beautiful-dnd-grid'
import { generateRandomColors } from './DragAndDropElements'
import { shuffleList } from './DragAndDropSwap'

export default function DragAndDropGame() {
  const [sortedList, setSortedList] = React.useState([])
  const [winning, setWinning] = React.useState<boolean>(false)

  const reorderList = (sourceIndex, destinationIndex) => {
    let updatedList = shuffleList(sourceIndex, destinationIndex, sortedList)
    let nonMatches = updatedList.filter((el) => {
      return el.order != el.winningOrder
    })
    if (nonMatches.length == 0) {
      setWinning(true)
    }
    setSortedList(updatedList)
  }

  const playAgain = () => {
    // setSortedList(Shuffle.shuffle(sortedList))
    setSortedList(generateRandomColors(fabricSwatches[selectedLine].swatches))
    setWinning(false)
  }

  const [selectedLine, setSelectedLine] =
    React.useState<string>('aurifilThread')

  // Change Line
  const changeLine = (el) => {
    setSelectedLine(el.target.value)
  }

  React.useEffect(() => {
    setSortedList(generateRandomColors(fabricSwatches[selectedLine].swatches))
  }, [selectedLine])

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <FabricButtons
          onclickEvent={changeLine}
          selectedLine={selectedLine}
          title="Fabric Line"
        />
      </Grid>
      <Grid item md={9} xs={12}>
        {winning && (
          <>
            <Box>You win!</Box>
            <Button variant="contained" onClick={playAgain}>
              Play Again
            </Button>
          </>
        )}
        {!winning && (
          <ListManager
            items={sortedList}
            direction="horizontal"
            maxItems={5}
            render={(item) => <>{item.element}</>}
            onDragEnd={reorderList}
          />
        )}
      </Grid>
    </Grid>
  )
}
