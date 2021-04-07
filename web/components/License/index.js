import { Box, Icon, Text } from '@chakra-ui/react'
import {By, Cc, Nc, Nd, Pd, Sa, Share, Zero, InCIcon, NoCIcon, OtherIcon} from './Icons'

const pickIcons = (url) => {
  switch(url) {
    case 'https://creativecommons.org/publicdomain/mark/1.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={Pd} /> Public domain
        </Text>
      )
    case 'https://creativecommons.org/publicdomain/zero/1.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={Zero} /> Zero
        </Text>
      )
    case 'https://creativecommons.org/licenses/by/4.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={By} /> CC BY
        </Text>
      )
    case 'https://rightsstatements.org/vocab/InC/1.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={InCIcon} /> In copyright
        </Text>
      )
    case 'https://rightsstatements.org/vocab/InC-NC/1.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={OtherIcon} /> Non-commercial use permitted
        </Text>
      )
    case 'https://rightsstatements.org/vocab/CNE/1.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={OtherIcon} /> Copyright not evaluated
        </Text>
      )
    case 'https://rightsstatements.org/vocab/UND/1.0/' : 
      return (
        <Text fontSize="xs">
          <Icon mt="-1" as={OtherIcon} /> Copyright undetermined
        </Text>
      )
    default: throw new Error(`no SVG for: ${url}`)
  }
}

export default function License({license}) {
  if(!license) {
    return null
  }

  return pickIcons(license)
}

