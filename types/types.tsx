export type QuiltGalleryPhotoType = {
  src: string
  width: number
  height: number
  title: string
}

export interface ListItem {
  id: string
  element: React.ReactNode
  winningOrder: number
  order: number
  value: number
}

export interface SwatchItem {
  name: string
  hex: string
}
