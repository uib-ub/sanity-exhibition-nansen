import { Container, Flex } from '@chakra-ui/react'

export default function ActorCollectionCards({ children }) {
  if (!children) {
    return null
  }

  return (
    <Container
      maxW="94vw"
      px="0"
      pt="4"
      borderTopWidth="thin"
      borderBottomWidth="thin"
      borderColor="blackAlpha.300"
    >
      <Flex as="section" maxW="full" overflowX="scroll" flex={'0 0'}>
        {children}
      </Flex>
    </Container>
  )
}

/*

.app > .full {
  grid-column: 1 / -1;
}

.hs {
  display: grid;
  grid-gap: calc(var(--gutter) / 2);
  grid-template-columns: 10px;
  grid-template-rows: minmax(150px, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: calc(50% - var(--gutter) * 2);

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(.75 * var(--gutter));
  margin-bottom: calc(-.25 * var(--gutter));
}

.hs:before,
.hs:after {
  content: '';
  width: 10px;
}

*/
