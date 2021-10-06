import Image from 'next/image'
import { kebabCase } from 'lodash'
import { getNextSanityImage } from '../../lib/sanity.server'
import { Box, Container, Heading, Grid, Text } from '@chakra-ui/layout'
// import Link from '../Link'
import PortableTextBlock from '../PT/PortableTextBlock'
import Timespan from '../Timespan'
// import Map from '../Map'

export default function EventSection(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { label, item, description, image } = props

  return (
    <Container px={[5, 5, 5, 0]} maxW={['sm', '2xl', '4xl', '6xl']} centerContent>
      <Grid maxW="4xl" mt="10" mb="28" templateColumns="1fr 1fr" gap={[5, null, 10, null]}>
        <Box position="relative">
          {image ? (
            <Image
              alt={item.label || 'No label'}
              {...getNextSanityImage(image)}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <Image
              alt={item.label || 'No label'}
              {...getNextSanityImage(item.image)}
              layout="intrinsic"
              objectFit="contain"
            />
          )}
          {/* {item.location && <Map data={item.location} />} */}
        </Box>

        <Box pt="5" borderTop="1px" borderColor="blackAlpha.200">
          <Heading
            id={kebabCase(label ?? item.label)}
            as="h3"
            maxW={['xl', null, 'xl', null]}
            fontSize={['xl', '2xl', '3xl', null]}
          >
            {item.label}
            {/* <Link href={`/id/${item._id}`}>{item.label}</Link> */}
          </Heading>

          {item.timespan && (
            <Text fontFamily="Montserrat">
              Tid:{' '}
              <Timespan
                display="inline-block"
                fontSize={['lg', null, 'xl', null]}
                timespan={item.timespan}
              />
            </Text>
          )}

          <PortableTextBlock
            fontSize={['sm', 'lg', null, null]}
            blocks={description ?? item.referredToBy[0].body}
          />

          {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
        </Box>
      </Grid>
    </Container>
  )
}
