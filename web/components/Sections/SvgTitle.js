import { Box } from '@chakra-ui/react'
import SVG from 'react-inlinesvg'

export default function SvgTitle(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { content, title } = props

  return (
    <Box maxW="xl">
      <SVG src={content.code} preProcessor={(code) => code.replace(/{title}/g, title)} />
    </Box>
  )
}
