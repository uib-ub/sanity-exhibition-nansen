import { imageBuilder } from '../../lib/sanity'
import { Flex, Grid, Box, Image, Container } from '@chakra-ui/react'
import Caption from './shared/caption'

export default function IllustrationWithCaption(props) {
  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }

  const { title, content, illustration, source } = props

  return (
    <Container maxW={['xl', '2xl', '5xl', '5xl']} centerContent>
      <Grid
        w="full"
        my={{ base: '6', md: '16', xl: '16' }}
        borderBottom={{ base: 'solid 1px', md: 'none' }}
        borderColor="gray.300"
        gridGap={[2, 2, 3, 3, 5]}
        gridTemplateAreas={{ base: '"image" "metadata"', xl: '"image metadata"' }}
        gridTemplateColumns={{ base: '3xl', xl: '10fr 4fr' }}
        gridTemplateRows="1fr auto"
      >
        {illustration ? (
          <Box maxH="55vh" w="100%" gridArea="image" bgColor="gray.200">
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
    </Container>
  )
}
