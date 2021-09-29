import Image from 'next/image'
import { kebabCase } from 'lodash'
import { getNextSanityImage } from '../../lib/sanity.server'
import { Box, Heading, Grid } from '@chakra-ui/layout'
import Link from '../Link'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function EventSection(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { label, item, description, image } = props

  return (
    <Grid
      p="4"
      maxW={['md', null, '4xl', null]}
      mx="auto"
      templateColumns="auto auto"
      bg="yellow.300"
    >
      {image ? (
        <Box mb="3" w="40vw" position="relative">
          <Image
            alt={item.label || 'No label'}
            {...getNextSanityImage(image)}
            layout="responsive"
          />
        </Box>
      ) : (
        <Box mb="3" w="20em" position="relative">
          <Image
            alt={item.label || 'No label'}
            {...getNextSanityImage(item.image)}
            layout="responsive"
          />
        </Box>
      )}

      <Box px="3">
        <Heading
          id={kebabCase(label ?? item.label)}
          as="h3"
          maxW={['xl', null, 'xl', null]}
          mx="auto"
          fontSize={['xl', '2xl', '3xl', null]}
        >
          <Link href={`/id/${item._id}`}>{item.label}</Link>
        </Heading>

        <PortableTextBlock
          fontSize={['sm', 'lg', null, null]}
          blocks={description ?? item.description}
        />
      </Box>
    </Grid>
  )
}
