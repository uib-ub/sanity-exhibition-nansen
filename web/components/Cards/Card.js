import NextLink from 'next/link'
import {Heading, HStack, Icon, IconButton, Flex, Text, GridItem, Box, Tag, Tooltip, Button, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Link, LinkBox, LinkOverlay, Spacer, useDisclosure} from '@chakra-ui/react'
import CardImage from './CardImage'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {FiExternalLink} from 'react-icons/fi'
import {VscJson} from 'react-icons/vsc'
import PortableTextBlock from '../PortableTextBlock'
import Date from '../Date'
import Timespan from '../Timespan'

export default function Card(props) {
  if(!props) {
    return null
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {_id, preferredIdentifier, label, description, image, hasType, aspectRatio, creation} = props.item

  const span = (a) => {
    const spans = {
      rowSpan: [1,1,2,2],
      colSpan: [1,1,2,2],
      /* aspectRatio: "1 / 1" */
    }
    
    if(a >= 1.3) {
      spans.rowSpan = [1,1,1,1]
      spans.colSpan = [1,1,2,2] 
      /* spans.aspectRatio = "1 / 2" */
    }
    if(a >= 1.9) {
      spans.rowSpan = [1,1,2,2]
      spans.colSpan = [1,1,4,4] 
      /* spans.aspectRatio = "1 / 2" */
    }
    if(a <= 0.7) {
      spans.rowSpan = [1,1,3,3]
      spans.colSpan = [1,1,2,2]
      /* spans.aspectRatio = "2 / 1" */
    }
    return spans
  }

  const a = span(aspectRatio)

  return (
    <GridItem 
      alignSelf="flex-start"
      borderWidth="1px" 
      borderRadius="md" 
      boxShadow="sm"
      {...a}
    >
      <LinkBox>
        {image && (
          <Box bgColor="gray.100">
            <CardImage id={_id} label={label} url={image} />
          </Box>
        )}

        <Box px="4" pt="2" pb="2">
          <Heading mt="1" fontFamily="Montserrat" fontWeight="semibold" as="h4" color="gray.600" fontSize={['sm', 'sm', 'md', 'md']} lineHeight="tight" >
            <NextLink href={`/id/${encodeURIComponent(_id)}`} passHref>
              <LinkOverlay><a>{label}</a></LinkOverlay>
            </NextLink>
          </Heading>

          {description && (<PortableTextBlock noOfLines="2" color="gray.600" fontSize={['md', 'md', 'lg', 'lg']}  blocks={description[0].body} />)}

          <Text fontSize={['md', 'md', 'lg', 'lg']} color="gray.500" fontFamily="Montserrat" mb="1">
            {creation && creation[0].creators && creation[0].creators
              .filter(c => c.name != 'Ukjent')
              .map((c, index) => (
                <span>{index === 0 ? '': ', '}{c.name}</span>
              )
            )}
          </Text>

          {creation && creation[0].timespan && (
            <Box>
              <Text position="relative" fontSize="sm" mt="4" mb="0">
                <Timespan timespan={creation[0].timespan} />
                {/* {creation[0].timespan && (<Date dateString={creation[0].timespan[0].date} />)} */}
              </Text>
            </Box>
          )}
        </Box>

        
        <Flex borderTop="dashed 1px"  borderColor="gray.200" px="4" pt="2">
          <Box>
            {hasType && (
              <HStack spacing={4} mb="2">
                {hasType.map((type) => (
                  <Tag fontFamily="Montserrat" key={type._id} fontSize={['xs', 'xs', 'xs', 'xs']} colorScheme="blackAlpha">
                    {type.label?.nor}
                  </Tag>
                ))}
              </HStack>
            )}
            
            {/* <Text alignSelf="center" fontSize="sm">{preferredIdentifier}</Text> */}
          </Box>

          <Spacer />
          
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
              <MenuItem icon={<Icon w={[2,4,5,5]} h={[2,4,5,5]} as={FiExternalLink} />}>
                Åpne i Marcus
              </MenuItem>
            </MenuList>
          </Menu>
          
          <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody overflowY="scroll">
                <pre>
                  {JSON.stringify(props.item, null, 2)}
                </pre>
              </ModalBody>
            </ModalContent>
          </Modal>

        </Flex>
      </LinkBox>
    </GridItem>
  )
}
