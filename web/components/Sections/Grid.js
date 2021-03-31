import {imageBuilder} from '../../lib/sanity'
import { romanize } from 'react-roman'
import NextLink from 'next/link'
import {Grid, Box, Heading, Image, LinkBox, LinkOverlay, Text} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function Hero(props) {
  if(props.disabled === true) {
    return null
  }

  const {items} = props

  const {colorMode, toggleColorMode} = useColorMode()
  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')


  return (
    <Grid
      templateColumns="1fr 1fr"
      maxW="4xl" 
      mb="10"
      boxSizing="border-box"
      m="auto"
      gap="10"
      p="10"
    >

      {items && items.map((item, index) => (
        <LinkBox key={item._key} position="relative" >
          <Text display="block" position="absolute" bgColor="white" p="2" display="inline" textTransform="lowercase">{romanize(index+1)}.</Text> 
          {item.illustration && (
            <Image
              mb="2"
              objectFit="cover"
              objectPosition="0% 100%"
              src={imageBuilder.image(item.illustration.image).height(500).width(500).url()}
              alt={''}
            />)
          }


          <Heading 
            fontSize={["xl", "2xl", "4xl", "5xl"]} 
          >
            <NextLink href={`/${item.route}`} passHref>
              <LinkOverlay>{item.title}</LinkOverlay>
            </NextLink>
          </Heading>

          {item.content && (
            <Box>
              <PortableTextBlock fontSize={["md", "xl"]} blocks={item.content} />
            </Box>
          )}

        </LinkBox>
      ))}
    </Grid>
  )
}
