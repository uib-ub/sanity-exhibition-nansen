import { imageBuilder } from '../../lib/sanity'
import { Flex, Grid, Box, Image } from '@chakra-ui/react'
import Caption from './shared/caption'

export default function IllustrationWithCaption(props) {
  if (!props && !props.illustration) {
    return null
  }

  const { title, content, illustration, source } = props

  return (
    <Grid
      maxW={['xl', 'xl', 'xl', '6xl']}
      my={{ base: '6', md: '16', xl: '20' }}
      borderBottom={{ base: 'solid 1px', md: 'none' }}
      borderColor="gray.300"
      gridGap={5}
      gridTemplateAreas={{ base: '"image" "metadata"', xl: '"image metadata"' }}
      gridTemplateColumns={{ base: '3xl', xl: '10fr 4fr' }}
      gridTemplateRows="1fr auto"
    >
      {illustration ? (
        <Box maxH="50vh" w="100%" gridArea="image" bgColor="gray.200">
          <Image
            boxSize="full"
            fit="contain"
            src={imageBuilder.image(illustration.image).fit('fillmax').height(800).url()}
            alt={''}
          />
        </Box>
      ) : (
        <Flex gridArea="image">Mangler illustrasjon</Flex>
      )}

      <Caption title={title} content={content} source={source} />
    </Grid>
  )
}
