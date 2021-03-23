import {Box, Container} from '@chakra-ui/react'
import SVG from 'react-inlinesvg';

export default function SvgTitle(props) {
  const {content, title} = props

  return (
    <Container maxW="3xl" my="10">
      <Box maxW="xl">
        <SVG src={content.code} preProcessor={code => code.replace(/{title}/g, title)} />
      </Box>
    </Container>
  )
}
