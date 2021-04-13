import {AspectRatio, Heading} from '@chakra-ui/react'

export default function Video(props) {
  return (
    <>
      <Heading fontSize="xl">{props.title}</Heading>
      <Container maxW="2xl" position="relative">
        {/* <ReactPlayer
          url={props.url}
          controls="true"
          width="1000px"
        /> */}
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={props.url}
            allowFullScreen
          />
        </AspectRatio>
      </Container>
    </>
  )
}
