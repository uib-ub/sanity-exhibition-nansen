import {imageBuilder} from '../../lib/sanity'
import {Button, Container, DrawerFooter, Drawer, DrawerContent, DrawerCloseButton, DrawerOverlay, DrawerBody, DrawerHeader, Flex, Box, Grid, Heading, Image, Badge, useDisclosure} from '@chakra-ui/react'
import {useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export default function SubStory(props) {
  if(props.disabled === true) {
    return null
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')

  const {label, title, tagline, content, illustration} = props

  return (
    <Grid 
      maxW="2xl"
      py="5"
      my="10"
      borderY="1px solid"
      borderColor="red.200"
      templateColumns="2fr 4fr 1fr"
      gap="4"
    >
      <Flex alignSelf="center">
        <Image
          maxW="100%"
          src={imageBuilder.image(illustration.illustration.image).fit('fill').height(500).width(500).url()}
          alt={''}
        />
      </Flex>

      <Box>
        <Badge
          backgroundColor={bg}
          color={color}
        >
          {label}
        </Badge>

        <Heading 
          fontSize={['xl', '2xl', '2xl', '3xl']} 
        >
          {title}
        </Heading>

        {tagline && (
          <Box>
            <PortableTextBlock fontSize={['md', 'xl']} blocks={tagline} />
          </Box>
        )}
      </Box>

      <Button 
        paddingTop="4"
        colorScheme="teal"
        variant="link"
        onClick={onOpen}
        rightIcon={<ArrowForwardIcon color="red.400" w={['10', null, '16', null]} h={['10', null, '20', null]} />}
        alignSelf="center"
      />
      
      <Drawer
        size="full"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{title}</DrawerHeader>

            <DrawerBody>
              <Container maxW="2xl" centerContent>
                {illustration?.illustration?.image && illustration.illustration.image && (
                  <Image
                    src={imageBuilder.image(illustration.illustration.image).height(600).width(800).url()}
                    alt={''}
                    mb="5"
                  />
                )}
                <PortableTextBlock fontSize={['md', 'xl']} blocks={content} />
                <Button 
                  my="16"
                  colorScheme="teal"
                  variant="link"
                  onClick={onClose}
                  rightIcon={<ArrowBackIcon color="red.400" w="16" h="20" />}
                  alignSelf="center"
                />
              </Container>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Grid>
  )
}
