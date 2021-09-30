import { Button, Container, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import RenderSections from '../../Sections/RenderSection'
import License from '../../License'
import React from 'react'
import Publisher from './Publisher'
// import { Image } from '../Image'

// import footerBorder from '../../public/img/taakeheimen-footer.svg'

export default function Footer(props) {
  if (!props) {
    return null
  }

  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('gray.500', 'gray.400')

  const { content, /* navMenu,  */ license, publisher } = props

  return (
    <Container
      as="footer"
      gridArea="footer"
      maxW="full"
      minH="100px"
      mt={['0', null, '8', null]}
      py="6"
      px="0"
      zIndex="100"
      color={color}
      backgroundImage={`url('${process.env.NEXT_PUBLIC_BASE_PATH}/img/taakeheimen-footer.svg')`}
      backgroundPosition={['50% 10%', '50% 8%', '50% 4%', null]}
      backgroundRepeat="no-repeat"
    >
      <Flex pl="5">
        <Button
          aria-label="Skift mellom dagmodus eller nattmodus"
          variant="link"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>

      <Container maxW="4xl" px="4" pt={['12%', '10%', '8%', null]} centerContent>
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

        <Container p="0" centerContent>
          {publisher && <Publisher publishers={publisher} />}
          {license && <License license={license} />}
        </Container>
      </Container>
    </Container>
  )
}
