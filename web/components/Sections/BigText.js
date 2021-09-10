import { Box } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Box maxW={['lg', null, null, null, '2xl']}>
      <PortableTextBlock
        fontSize={{ base: 'lg', sm: '2xl', md: '2xl', xl: '3xl' }}
        fontWeight="500"
        blocks={props.content}
      />
    </Box>
  )
}
