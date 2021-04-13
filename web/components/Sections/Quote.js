import {Box} from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

export default function Quote(props) {
  return (
    <Box maxW="lg" m="10">
      <PortableTextBlockQuote fontSize="2xl" blocks={props.content} />
      
      {props.credit && (
        <PortableTextBlock blocks={props.credit} />
      )}
    </Box>
  )
}
