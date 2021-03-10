import {Flex, Container, Button, Text, useColorMode, useColorModeValue, Spacer} from '@chakra-ui/react'
import ActiveLink from './ActiveLink'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'

const MenuItem = ({children}) => (
  <Text mt="0" mr={6} mb="0" display="block">
    {children}
  </Text>
)

export default function Footer(props) {
  const {colorMode, toggleColorMode} = useColorMode()
  const bg = useColorModeValue('white', 'gray.700')

  const {navMenu} = props

  return (
    <Container 
      as="footer" 
      gridArea="footer"
      maxW="full" 
      py="2"
      borderTopWidth="thin"
      borderTopStyle="dashed"
      borderTopColor="gray.400"
      bg={bg}
      zIndex="100"
    >
      <Flex>
        <Button variant="link" onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Spacer />
        
        {navMenu?.items && navMenu.items.map((item) => (
          <MenuItem key={item._key}>
            <ActiveLink fontFamily="'Open Sans'" href={`/${item.route ?? ''}`} activeClassName="active">
              <a>{item.label}</a>
            </ActiveLink>
          </MenuItem>
        ))}
      </Flex>
    </Container>
  )
}
