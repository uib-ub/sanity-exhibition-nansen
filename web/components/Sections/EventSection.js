import Image from 'next/image'
import { kebabCase } from 'lodash'
import { getNextSanityImage } from '../../lib/sanity.server'
import { Box, Heading, Grid, Text } from '@chakra-ui/layout'
import Link from '../Link'
import PortableTextBlock from '../PT/PortableTextBlock'
import Timespan from '../Timespan'
// import Map from '../Map'

export default function EventSection(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { label, item, description, image } = props

  return (
    <Grid maxW={['md', null, '4xl', null]} mx="auto" my="28" templateColumns="1fr 1fr">
      <Box maxW="full" position="relative">
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

      <Box pl="5" pt="5" borderTop="1px" borderColor="blackAlpha.200">
        <Heading
          id={kebabCase(label ?? item.label)}
          as="h3"
          maxW={['xl', null, 'xl', null]}
          fontSize={['xl', '2xl', '3xl', null]}
        >
          <Link href={`/id/${item._id}`}>{item.label}</Link>
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
  )
}
