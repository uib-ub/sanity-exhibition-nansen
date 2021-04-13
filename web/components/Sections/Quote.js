import {Box} from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

export default function Quote(props) {
  return (
    <Box maxW="xl" m="10">
      <PortableTextBlockQuote fontSize="2xl" blocks={props.content} />
      
      {props.credit && (
        <PortableTextBlock textAlign="right" blocks={props.credit} />
      )}
    </Box>
  )
}
