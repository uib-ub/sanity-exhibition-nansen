import NextLink from 'next/link'
import {
  Code,
  Heading, HStack, Icon, IconButton, Image, Flex, Text, GridItem, Box, Tag, 
  Menu, MenuButton, MenuList, MenuItem,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, 
  Link, LinkBox, LinkOverlay, Spacer, useDisclosure, useColorMode, useColorModeValue
} from '@chakra-ui/react'
import {imageBuilder} from '../../lib/sanity'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {FiExternalLink} from 'react-icons/fi'
import {VscJson} from 'react-icons/vsc'
import PortableTextBlock from '../PortableTextBlock'
import CardImage from './CardImage'
import Timespan from '../Timespan'

export default function Card(props) {
  if(!props) {
    return null
  }

  const {colorMode, toggleColorMode} = useColorMode()
  const bg = useColorModeValue('white', 'transparent')
  const color = useColorModeValue('gray.600', 'gray.200')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const tagColor = useColorModeValue('blackAlpha', 'red')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {_id, preferredIdentifier, label, description, image, homepage, hasType, aspectRatio, creation, hasCurrentOwner} = props.item

  const calculateSpans = (ratio) => {
    /* Dafault */
    const spans = {
      rowSpan: [1,2,1,1,1],
      colSpan: [1,1,1,1,1],
      /* aspectRatio: "1 / 1" */
    }
    
    /* Landscape */
    if(ratio >= 1.4) {
      spans.colSpan = [1,2,2,2,2] 
      spans.rowSpan = [1,1,1,1,1]
      /* spans.aspectRatio = "1 / 2" */
    }
    /* Extreme Landscape */
    if(ratio >= 1.9) {
      spans.colSpan = [1,2,2,2,3] 
      spans.rowSpan = [1,1,1,1,1]
      /* spans.aspectRatio = "1 / 2" */
    }
    /* Portrait */
    if(ratio <= 0.6) {
      spans.colSpan = [1,1,1,1,1]
      spans.rowSpan = [1,1,1,2,2]
      /* spans.aspectRatio = "2 / 1" */
    }
    return spans
  }

  const spanObj = calculateSpans(aspectRatio)

  return (
    <GridItem
      as="article"
      alignSelf="flex-start"
      borderColor={borderColor}
      borderWidth="1px" 
      borderRadius="md"
      boxShadow="sm"
      bgColor={bg}
      {...spanObj}
    >
      <LinkBox>
        {image && (
          <Box bgColor="gray.100">
            <CardImage id={_id} label={label} url={image} />
          </Box>
        )}

        <Box px="4" pt="2" pb="2">
          <Heading 
            mt="1" 
            fontFamily="Montserrat" 
            fontWeight="semibold" 
            as="h4" 
            color={color}
            fontSize={['xs', 'sm', 'md', 'md']} 
            lineHeight="tight" >
            <NextLink href={`/id/${encodeURIComponent(_id)}`} passHref>
              <LinkOverlay>{label}</LinkOverlay>
            </NextLink>
          </Heading>

          {description && description.length > 0 && (
            <PortableTextBlock 
              noOfLines="2" 
              color={color}
              fontSize={['md', 'md', 'lg', 'lg']} 
              blocks={description[0].body} 
            />
          )}

          {creation && creation[0].creators && 
            (<Text 
              fontSize={['xs', 'sm', 'sm', 'sm']} 
              color="gray.500" 
              fontFamily="Montserrat" 
              mb="1"
            >
              {creation[0].creators
                .filter(creator => creator.name != 'Ukjent')
                .map((creator, index) => (
                  <span key={creator._id}>{index === 0 ? '': ', '}{creator.name}</span>
                )
              )}
            </Text>
          )}

          {creation && creation[0].timespan && (
            <Box 
              fontFamily="Montserrat"
              fontSize={['xs', 'sm', 'sm', 'sm']}
              color="gray.500"
            >
              <Timespan timespan={creation[0].timespan} />
            </Box>
          )}
        </Box>

        
        <Flex borderTop="dashed 1px"  borderColor={borderColor} px="4" pt="2">
          {hasType && (
            <HStack spacing={4} mb="2" mr="2">
              {hasType.map((type) => (
                <Tag 
                  key={type._id} 
                  fontFamily="Montserrat" 
                  fontSize={['xs', 'xs', 'xs', 'xs']} 
                  colorScheme={tagColor}
                >
                  {type.label?.nor}
                </Tag>
              ))}
            </HStack>
          )}
            
          {/* <Text alignSelf="center" fontSize="sm">{aspectRatio}</Text> */}

          <Spacer />
          
          {hasCurrentOwner && (
            <Image
              display="inline-block"
              boxSize="5"
              src={imageBuilder.image(hasCurrentOwner.image).height(20).width(20).url()}
            />
          )}
          
          <Menu>
            <MenuButton 
              alignSelf="flex-start"
              as={IconButton} 
              aria-label="Options"
              size="xs"
              variant="link"
              rightIcon={<Icon w={[2,4,4,5]} h={[2,4,4,5]} as={BiDotsVerticalRounded} />} 
            />
            <MenuList fontFamily="Montserrat">
              <MenuItem onClick={onOpen} icon={<Icon w={[2,4,5,5]} h={[2,4,5,5]} as={VscJson} />}>
                Data
              </MenuItem>
              {homepage && (
                <NextLink href={homepage} passHref>
                  <MenuItem as={Link} isExternal icon={<Icon w={[2,4,5,5]} h={[2,4,5,5]} as={FiExternalLink} />}>
                    Åpne hjemmeside
                  </MenuItem>
                </NextLink>
              )}
            </MenuList>
          </Menu>
          
          <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>JSON</ModalHeader>
              <ModalBody overflowY="scroll">
                <Code w="full" fontSize="xs" p="2">
                  <pre>
                    {JSON.stringify(props.item, null, 2)}
                  </pre>
                </Code>
              </ModalBody>
            </ModalContent>
          </Modal>

        </Flex>
      </LinkBox>
    </GridItem>
  )
}
