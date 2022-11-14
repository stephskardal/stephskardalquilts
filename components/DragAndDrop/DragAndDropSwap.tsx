export const shuffleList = (sourceIndex, destinationIndex, sortedList) => {
  if (destinationIndex === sourceIndex) {
    return
  }
  const list = sortedList

  if (destinationIndex === 0) {
    list[sourceIndex].order = list[0].order - 1
  } else if (destinationIndex === list.length - 1) {
    list[sourceIndex].order = list[list.length - 1].order + 1
  } else if (destinationIndex < sourceIndex) {
    list[sourceIndex].order =
      (list[destinationIndex].order + list[destinationIndex - 1].order) / 2
  } else {
    list[sourceIndex].order =
      (list[destinationIndex].order + list[destinationIndex + 1].order) / 2
  }
  let updatedList = list
    .slice()
    .sort((first, second) => first.order - second.order)
  updatedList.forEach((el, index) => {
    el.order = index
  })
  return updatedList
}
