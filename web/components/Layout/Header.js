import React from 'react'
import Link from 'next/link'
import {
  Button,
  Container,
  Flex,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Heading,
  Icon,
  useColorMode,
  useColorModeValue,
  Spacer,
  // Image,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
import NightIcon from './NightIcon'
import DayIcon from './DayIcon'
// import { imageBuilder } from '../../lib/sanity'

export default function Header(props) {
  if (!props) {
    return null
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('white', 'gray.800')

  const { data, ...rest } = props
  const { title, /* logo, */ mainNavigation, footer } = data

  return (
    <Container pt="3" maxW="full" bgColor={bg} margin="auto">
      <Flex as="header" pb="1" borderBottom="solid 1px " {...rest}>
        <Flex direction="row" alignItems="center">
          {/* <Image
            src={imageBuilder.image(logo).height(100).url()}
            alt="site logo"
            h={{ base: '25px' }}
            mr="4"
          /> */}
          <Heading
            fontSize={['lg', 'xl', '2xl', '2xl']}
            fontWeight={{ base: 'normal' }}
            fontFamily="EB Garamond"
          >
            <Link href="/">
              <a>{title}</a>
            </Link>
          </Heading>
        </Flex>

        <Spacer />

        <Flex as="nav">
          <Menu placement="bottom">
            <MenuButton
              as={Button}
              variant="link"
              color="gray.900"
              /* fontWeight={{ base: 'normal' }} */
              textTransform="uppercase"
              rightIcon={<ChevronDownIcon />}
            >
              Meny
            </MenuButton>
            <MenuList
              pl="10"
              as={List}
              styleType="lower-roman"
              spacing="1"
              fontSize={['md', 'md', 'lg', 'lg']}
              zIndex="9999"
            >
              {mainNavigation?.items &&
                mainNavigation.items.map((item) => (
                  <MenuItem as={ListItem} display="list-item" key={item._key}>
                    <ActiveLink href={`/${item.route}`} activeClassName="active">
                      <a>{item.label}</a>
                    </ActiveLink>

                    {/* {item.children && (
                      <MenuList styleType='circle' ml='4' fontSize={['sm', 'sm', 'md', 'md']}>
                      {item.children.map(child => (
                        <MenuItem key={child._key}>
                        <ActiveLink href={`/${child.route}`} activeClassName='active'>
                        <a>{child.label}</a>
                        </ActiveLink>
                        </MenuItem>
                        ))}
                        </MenuList>
                      )} */}
                  </MenuItem>
                ))}

              <MenuDivider />

              {footer.navMenu?.items &&
                footer.navMenu.items.map((item) => (
                  <MenuItem
                    as={ListItem}
                    display="list-item"
                    sx={{ listStyleType: 'disc' }}
                    key={item._key}
                  >
                    <ActiveLink href={`/${item.route}`} activeClassName="active">
                      <a>{item.label}</a>
                    </ActiveLink>
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </Flex>

        <Button display={{ base: 'none', md: 'inherit' }} px="0" ml="5" onClick={toggleColorMode}>
          {colorMode === 'light' ? (
            <Icon as={NightIcon} w={16} h={16} />
          ) : (
            <Icon as={DayIcon} w={16} h={16} color="white" />
          )}
        </Button>

        {/*  <Box ml='-5' display={{ base: 'none', md: 'inherit' }}>
          {publisher && publisher.map(p =>
            <Container key={p._id} fontSize='xs' p='0' centerContent>
              <Image
                boxSize='50px'
                // filter={inverse}
                src={imageBuilder
                  .image(p.image)
                  .height(50)
                  .width(50)
                  .url()}
              />
              <Link href={`/id/${p._id}`}>{p.label.no}</Link>
            </Container>
          )}
        </Box> */}
      </Flex>
    </Container>
  )
}
