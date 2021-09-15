import { Container } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'
import Sections from '../Sections/Sections'

/* Used for preview */
export default function Page(data) {
  return (
    <Container maxWidth="4xl" centerContent>
      {data.content && <Sections sections={data.content} />}
      {/* If LinguisticDocument the content is in the body field */}
      {data.body && <PortableTextBlock blocks={data.body} />}
    </Container>
  )
}
