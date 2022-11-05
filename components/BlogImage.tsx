import * as React from 'react'
import Image from 'next/legacy/image'

export interface BlogImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function BlogImage(props: BlogImageProps) {
  return (
    <Image
      src={`/images/${props.src}`}
      alt={props.alt}
      priority
      height={props.height}
      width={props.width}
      className="next-image"
    />
  )
}
