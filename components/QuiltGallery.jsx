import React, { useState, useCallback } from 'react'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { galleryImages } from '../public/galleryImages'
import { Typography, Box } from '@mui/material'

// Not Typescript b/c modula doesn't work with it
//export interface QuiltGalleryProps {
//  year: number;
//}

export default function QuiltGallery(props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  let filteredImages = []
  galleryImages
    .filter((item) => item.year == props.year)
    .forEach((photo) => {
      filteredImages.push({
        src: '/galleries/' + photo.src,
        width: photo.width,
        height: photo.height,
        title: photo.title
      })
    })

  return (
    <Box sx={{ maxWidth: '1200px', m: '0px auto' }}>
      {props.showTitle && (
        <Typography
          component="h1"
          sx={{ fontSize: '50px', paddingBottom: '20px' }}
        >
          Gallery: {props.year}
        </Typography>
      )}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1, mt: '10px' }}>
          <Gallery photos={filteredImages} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={filteredImages.map((x) => ({
                    ...x,
                    srcset: x.src,
                    source: x.src,
                    caption: x.title
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </Box>
      </Box>
    </Box>
  )
}
