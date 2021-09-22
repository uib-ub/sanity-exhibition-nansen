import Image from 'next/image'
import { Box, Grid, Flex, Heading, Spacer } from '@chakra-ui/react'
import Source from './Source'
import PortableTextBlock from '../PT/PortableTextBlock'
import { getNextSanityImage } from '../../lib/sanity.server'

export default function SingleObject(props) {
  if ((!props && !props.item) || props.disabled === true) {
    return null
  }

  const { title, content, item, forseesUseOf } = props

  return (
    <Grid
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{ base: '6', md: '8', xl: '10' }}
      p={{ base: '6', md: '8', xl: '10' }}
      border={{ base: 'solid 5px' }}
      borderColor="gray.800"
      gridGap={5}
      gridTemplateAreas={{ base: '"content" "design"', xl: '"content design"' }}
      gridTemplateColumns={{ base: '3xl', xl: '10fr 4fr' }}
      gridTemplateRows="1fr auto"
    >
      <Box gridArea="content">
        {item?.image && (
          <Box mb="10" maxH="50vh">
            <Image alt={title ?? ''} {...getNextSanityImage(item.image)} layout="responsive" />
            <Source {...item} />
          </Box>
        )}

        <Flex
          h="full"
          flexDirection="column"
          fontFamily="Montserrat"
          gridArea="metadata"
          pr={{ base: 0, md: 10 }}
          alignSelf="flex-end"
        >
          <Heading
            fontFamily="Montserrat"
            fontWeight="semibold"
            color="red.600"
            fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'xl' }}
            mb={1}
          >
            {title}
          </Heading>

          {content && (
            <PortableTextBlock
              fontSize={{ base: 'sm', sm: 'sm', md: 'sm', xl: 'md' }}
              fontWeight="200"
              blocks={content}
            />
          )}
          <Spacer />
        </Flex>
      </Box>
      <Box gridArea="design">
        <Heading
          fontFamily="Montserrat"
          fontWeight="semibold"
          color="red.600"
          fontSize={{ base: 'sm', sm: 'sm', md: 'md', xl: 'xl' }}
          mb={1}
        >
          {forseesUseOf.label.no}
        </Heading>

        {forseesUseOf?.referredToBy && (
          <PortableTextBlock
            fontSize={{ base: 'sm', sm: 'sm', md: 'sm', xl: 'md' }}
            fontWeight="200"
            blocks={forseesUseOf.referredToBy[0].body}
          />
        )}

        {/* TODO: Fix grid and image size */}
        {forseesUseOf?.image && (
          <Box maxW="full" position="relative">
            <Image alt={''} {...getNextSanityImage(forseesUseOf.image)} layout="responsive" />
          </Box>
        )}
      </Box>
    </Grid>
  )
}
