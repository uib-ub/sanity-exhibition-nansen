import { Box } from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

export default function Quote(props) {
  return (
    <Box as="figure" maxWidth={['xl', null, 'xl', null]}>
      <blockquote>
        <PortableTextBlockQuote fontSize="xl" blocks={props.content} />
      </blockquote>

      {props.credit && (
        <figcaption>
          <PortableTextBlock maxW="70%" textAlign="right" blocks={props.credit} />
        </figcaption>
      )}
    </Box>
  )
}
