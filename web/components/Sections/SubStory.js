import {imageBuilder} from '../../lib/sanity'
import {Button, Container, DrawerFooter, Drawer, DrawerContent, DrawerCloseButton, DrawerOverlay, DrawerBody, DrawerHeader, Box, Flex, Heading, Image, Badge, useDisclosure} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export default function SubStory(props) {
  if(props.disabled === true) {
    return null
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {colorMode, toggleColorMode} = useColorMode()
  const bg = useColorModeValue('gray.800', 'gray.300')
  const color = useColorModeValue('white', 'gray.800')


  const image = props.illustration.image

  return (
    <Container maxW="6xl" p="0">
      <Flex 
        maxW="2xl"
        p="6"
        my="10"
        borderY="1px solid"
        borderColor="red.200"
      >
        <Box>
          <Badge 
            backgroundColor={bg} 
            color={color}
          >
            {props.label}
          </Badge>
          <Heading 
            fontSize={["xl", "2xl", "2xl", "4xl"]} 
          >
            {props.title}
          </Heading>

          {props?.tagline && (
            <Box>
              <PortableTextBlock fontSize={["md", "xl"]} blocks={props.tagline} />
            </Box>
          )}
        </Box>

        <Button 
          colorScheme="teal"
          variant="link"
          onClick={onOpen}
          rightIcon={<ArrowForwardIcon color="red.400" w={["10", null, "20", null]} h={["10", null, "20", null]} />}
          alignSelf="center"
        />
        
      </Flex>
      
      <Drawer
        size="full"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{props.title}</DrawerHeader>

            <DrawerBody>
              <Container maxW="2xl" centerContent>
                <Image
                  src={imageBuilder.image(image).height(600).width(800).url()}
                  alt={''}
                  mb="5"
                />
                <PortableTextBlock fontSize={["md", "xl"]} blocks={props.content} />
                <Button 
                  my="16"
                  colorScheme="teal"
                  variant="link"
                  onClick={onClose}
                  rightIcon={<ArrowBackIcon color="red.400" w="20" h="20" />}
                  alignSelf="center"
                />
              </Container>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Container>
  )
}
