import {Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  return (
    <Container maxW="3xl" my="10">
      <Box maxW={["lg",null, null, null, "2xl"]}>
        <PortableTextBlock
          fontSize={{base: "lg", sm: "2xl", md: "2xl", xl: "3xl"}}
          fontWeight="500"
          blocks={props.content}
          
        />
      </Box>
    </Container>
  )
}
