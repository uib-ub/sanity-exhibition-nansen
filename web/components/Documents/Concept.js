import {Box, Container, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'

export default function Concept(item) {
  return (
    <Container h="100vh" maxW="full" py="10" centerContent>
      <Heading fontSize={["2xl", "4xl", "5xl", "6xl"]}>{item.label.nor}</Heading>
      
      <Box maxW="2xl">
        {item?.referredToBy?.map((ref) => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>
      
      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
