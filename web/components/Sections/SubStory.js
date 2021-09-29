import {
  Button,
  Container,
  DrawerFooter,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  Flex,
  Box,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { ImEye } from 'react-icons/im'
import PortableTextBlock from '../PT/PortableTextBlock'
import IllustrationWithCaption from './IllustrationWithCaption'

export default function SubStory(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { /* label, */ title, tagline, content, illustration } = props

  return (
    <Container
      maxW="full"
      my="10"
      centerContent
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="red.200"
      color="gray.500"
    >
      <Flex pt="2" alignItems="baseline" justifyContent="baseline">
        <Box mr="3" mt="-3">
          <Icon as={ImEye} w={8} h={8} />
        </Box>

        {/*  <Box pt="2">
          {label && (
            <Badge variant="solid" colorScheme="red">
              {label}
            </Badge>
          )}

          {title && <Heading fontSize={['xl', 'xl', 'xl', 'xl']}>{title}</Heading>}
          </Box> */}

        {tagline && (
          <Box mr={{ xs: 6 }}>
            <PortableTextBlock noOfLines={1} fontSize={['md', 'lg']} blocks={tagline} />
          </Box>
        )}

        {/* {illustration && illustration.illustration && (
          <Image
            src={imageBuilder.image(illustration.illustration.image).fit('fill').height(200).url()}
            alt={''}
          />
        )} */}
        <Button variant="link" onClick={onOpen} ml="4" mr={{ sm: 4 }}>
          Les mer
        </Button>
      </Flex>

      <Drawer size="xl" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{title}</DrawerHeader>

            <DrawerBody>
              <Container maxW="2xl" centerContent>
                {illustration?.illustration?.image && illustration.illustration.image && (
                  <IllustrationWithCaption {...illustration} />
                )}
                {content ? (
                  <PortableTextBlock fontSize={['md', 'xl']} blocks={content} />
                ) : (
                  <Text>Missing content</Text>
                )}
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
    </Container>
  )
}
