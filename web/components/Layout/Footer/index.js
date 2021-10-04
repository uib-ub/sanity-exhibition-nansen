import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import RenderSections from '../../Sections/RenderSection'
import License from '../../License'
import React from 'react'
import Publisher from './Publisher'
import ActiveLink from '../../Link/ActiveLink'
// import { Image } from '../Image'

// import footerBorder from '../../public/img/taakeheimen-footer.svg'

export default function Footer(props) {
  if (!props) {
    return null
  }

  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('gray.500', 'gray.400')

  const { content, mainNavigation, navMenu, license, publisher } = props

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
        {mainNavigation?.items && (
          <Flex fontSize={['xl', null, '2xl', null]}>
            {mainNavigation?.items &&
              mainNavigation.items.map((item) => (
                <Box key={item._key} p="3">
                  <ActiveLink href={`/${item.route}`} activeClassName="active">
                    <a>{item.label}</a>
                  </ActiveLink>
                </Box>
              ))}
          </Flex>
        )}

        {navMenu?.items && (
          <Flex mb="5" fontSize={['lg', null, 'xl', null]}>
            {navMenu?.items &&
              navMenu.items.map((item) => (
                <Box key={item._key} p="3">
                  <ActiveLink href={`/${item.route}`} activeClassName="active">
                    <a>{item.label}</a>
                  </ActiveLink>
                </Box>
              ))}
          </Flex>
        )}

        <Divider mb="10" />

        {content && (
          <Box textAlign="center">
            <RenderSections sections={content} />
          </Box>
        )}

        <Container p="0" centerContent>
          {publisher && <Publisher publishers={publisher} />}
          {license && <License license={license} />}
        </Container>
      </Container>
    </Container>
  )
}
