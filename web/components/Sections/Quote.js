import { Box } from '@chakra-ui/react'
import PortableTextBlockQuote from '../PT/PortableTextBlockQuote'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function Quote(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box as="figure" maxWidth={['xl', null, 'xl', null]} mx="auto">
      <blockquote>
        <PortableTextBlockQuote fontSize="2xl" blocks={props.content} />
      </blockquote>

      {props.credit && (
        <figcaption>
          <PortableTextBlock pl="20" textAlign="right" blocks={props.credit} />
        </figcaption>
      )}
    </Box>
  )
}
