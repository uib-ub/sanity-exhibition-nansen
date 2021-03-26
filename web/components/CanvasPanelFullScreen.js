import React from 'react'
import {Box} from '@chakra-ui/react'
import { PatchworkPlugin } from '@canvas-panel/patchwork-plugin/umd/@canvas-panel/patchwork-plugin'
import {
  Manifest,
  CanvasProvider,
  Viewport,
  StaticImageViewport,
  SingleTileSource,
  OpenSeadragonViewport,
  SizedViewport,
  functionOrMapChildren,
  AnnotationDetail,
  FullPageViewport,
  AnnotationRepresentation,
  AnnotationSelector,
} from '@canvas-panel/core';

const CanvasPanelFullScreen = React.forwardRef(({manifest}, ref) => {
  if (!manifest) {
    return null
  }
  /* console.log(manifest)

  manifest = manifest[0].startsWith("/api/manifest/") ? `https://marcus-manifest-api.vercel.app${manifest}` : manifest */

  return (
    <Box position="relative" maxh={600}>
    <PatchworkPlugin 
        manifest={manifest[0]} 
        title="Testing title" 
        cssClassPrefix="patchwork-"
        maxHeight={700}
        maxWidth={1200}/>
      {/* <Manifest url={manifest[0]}>
        <CanvasProvider startCanvas={0}>
          <Viewport maxWidth={1200} maxHeight={600}>
            <StaticImageViewport
              viewportController={true}
              maxHeight={600}
              maxWidth={1200}
            />
          </Viewport>
        </CanvasProvider>
      </Manifest> */}
    </Box>
  )
})

export default CanvasPanelFullScreen