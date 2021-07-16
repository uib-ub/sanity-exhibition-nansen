import {
  Container,
  Button,
  Flex,
  HStack,
  Image,
  useColorMode,
  // Spacer,
  // Text,
} from '@chakra-ui/react'
// import ActiveLink from '../Link/ActiveLink'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import RenderSections from '../Sections/RenderSection'
import License from '../License'
import Link from '../Link'
import { imageBuilder } from '../../lib/sanity'

/* const MenuItem = ({ children }) => (
  <Text
    fontSize={{ base: 'md', sm: 'md', md: 'xl', xl: 'xl' }}
    mt="0"
    mr={6}
    mb="0"
    display="block"
  >
    {children}
  </Text>
) */

export default function Footer(props) {
  if (!props) {
    return null
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const { content, /* navMenu,  */ license, publisher } = props

  return (
    <Container as="footer" gridArea="footer" maxW="full" minH="100px" py="2" px="0" zIndex="100">
      <Flex pl="5">
        <Button variant="link" onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>

      <Image src="/img/taakeheimen-footer.svg" alt="" />

      <Container maxW="4xl" p="0">
        {/* <Flex pb="0">
          <Spacer />

          {navMenu?.items &&
            navMenu.items.map((item) => (
              <MenuItem key={item._key}>
                <ActiveLink
                  href={`/${item.route}`}
                  activeClassName="active"
                >
                  <a>{item.label}</a>
                </ActiveLink>
              </MenuItem>
            ))}
        </Flex> */}
        {content && <RenderSections sections={content} />}

        {publisher &&
          publisher.map((p) => (
            <Container key={p._id} fontSize="xs" p="0" centerContent>
              <Image
                boxSize="50px"
                // filter={inverse}
                src={imageBuilder.image(p.image).height(50).width(50).url()}
              />
              <Link href={`/id/${p._id}`}>{p.label.no}</Link>
              <HStack ml="-5" display={{ base: 'none', md: 'inherit' }}>
                <License license={license} />
              </HStack>
            </Container>
          ))}
      </Container>
    </Container>
  )
}
