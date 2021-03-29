import NextLink from 'next/link'
import { Text, Icon, Link } from "@chakra-ui/react"
import { BsInfoCircle } from 'react-icons/bs'

export default function Source(props) {
  if(!props) {
    return null
  }

  const {_id, label, owner} = props

  return (
    <Text color="gray.500" fontSize={{base: "xs", sm: "xs", md: "sm", xl: "sm"}}>
      <Icon as={BsInfoCircle} mr="2" />

      <i>
        <Link as={NextLink} href={`/id/${_id}`} isExternal>
          {label}
        </Link>
      </i>

      {owner?.length && (
        `. ${owner[0].label}.`
      )}
    </Text>
  )
}