import { AspectRatio, Container } from '@chakra-ui/react'
import Caption from './shared/caption'

export default function Iframe(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container maxW={['xl', 'xl', 'xl', '6xl']} my="10" px="0">
      <Container maxW="full" backgroundColor="white" px="0" mb="4" position="relative">
        <AspectRatio ratio={4 / 3}>
          <iframe src={props.url} allowFullScreen aria-hidden="false" tabIndex="0" />
        </AspectRatio>
      </Container>
      <Caption title={props.title} />
    </Container>
  )
}
