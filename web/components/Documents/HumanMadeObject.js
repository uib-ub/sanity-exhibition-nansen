import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  Grid,
  Container,
  Heading,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useClipboard,
} from '@chakra-ui/react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import ReferredToBy from '../ReferredToBy'
import Palette from '../Palette'
import Depicts from '../Depicts'
import ActivityStream from '../ActivityStream'
import HasType from '../HasType'
import Subject from '../Subject'
import CurrentOwner from '../CurrentOwner'
import Description from '../Description'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})

export default function HumanMadeObject(item) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {hasCopied, onCopy} = useClipboard(JSON.stringify(item, null, 2))

  return (
    <Grid
      w="100%"
      h="100%"
      p={5}
      gridGap={{xl: 5, base: 0}}
      alignContent="start"
      gridTemplateAreas={{xl: `"image" "metadata"`, base: `"image" "metadata"`}}
      gridTemplateColumns={{xl: '1fr', base: '1fr'}}
    >
      <Container maxW="full" gridArea="metadata" p="0">
        
        {item.image?.palette && <Palette colors={item.image.palette} />}

        <Heading fontFamily="EB Garamond" fontWeight="thin" mt={5} mb={5}>
          {item.label}

          <Button variant="link" size="lg" onClick={onOpen}>
            <Icon as={BiDotsVerticalRounded} />
          </Button>
        </Heading>

        {item.description && 
          <Description description={item.description} /> 
        }
        
        {item?.referredToBy && (
          <Box>
            <ReferredToBy array={item.referredToBy} />
          </Box>
        )}

        {item.hasType && 
          <HasType types={item.hasType} />
        }

        {item.subject && 
          <Subject subjects={item.subject} />
        }

        {item.hasCurrentOwner && 
          <CurrentOwner owners={item.hasCurrentOwner} />
        }

        {item.depicts && 
          <Depicts depicted={item.depicts} />
        }

        {item.activityStream && 
          <ActivityStream stream={item.activityStream} />
        }
      </Container>

      {item.subjectOfManifest && (
        <Box gridArea="image">
          <MiradorWithNoSSR palette="light" windows={[{manifest: item.subjectOfManifest}]} />
        </Box>
      )}

      {item.manifest && !item.subjectOfManifest && (
        <Box gridArea="image">
          <MiradorWithNoSSR palette="light" windows={[{manifest: item.manifest}]} />
        </Box>
      )}
      <Modal isOpen={isOpen} size="xl" onClose={onClose} scrollBehavior="inside">
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>JSON</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Grid>
  )
}
