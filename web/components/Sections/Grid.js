import { imageBuilder } from '../../lib/sanity'
import { romanize } from 'react-roman'
import NextLink from 'next/link'
import { Grid, Box, Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import PortableTextBlock from '../PT/PortableTextBlock'

export default function Hero(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Grid templateColumns="1fr 1fr" maxW="4xl" mb="10" boxSizing="border-box" m="auto" gap="10">
      {items &&
        items.map((item, index) => (
          <LinkBox key={item._key} position="relative">
            <Text
              display="block"
              position="absolute"
              bgColor="white"
              p="2"
              textTransform="lowercase"
            >
              {romanize(index + 1)}.
            </Text>
            {item.illustration && (
              <Image
                mb="2"
                objectFit="cover"
                objectPosition="0% 100%"
                src={imageBuilder.image(item.illustration.image).height(1000).width(1000).url()}
                alt={''}
              />
            )}

            <Heading fontSize={['xl', '2xl', '4xl', '5xl']}>
              <NextLink href={`/${item.route}`} passHref>
                <LinkOverlay>{item.title}</LinkOverlay>
              </NextLink>
            </Heading>

            {item.content && (
              <Box>
                <PortableTextBlock fontSize={['md', 'xl']} blocks={item.content} />
              </Box>
            )}
          </LinkBox>
        ))}
    </Grid>
  )
}
