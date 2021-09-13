import NextLink from 'next/link'
import { Link, Text } from '@chakra-ui/react'

const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlockQuote(props) {
  if (!props.blocks) {
    return null
  }

  const { fontSize, fontWeight } = props

  const BlockRenderer = (props) => {
    return (
      <Text fontSize={fontSize} fontWeight={fontWeight}>
        {props.children}
      </Text>
    )
    // Fall back to default handling
    // return BlockContent.defaultSerializers.types.block(props)
  }

  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => {
        const { reference } = mark
        const href = `/id/${reference._ref}`
        const text = children.length ? children[0] : children
        return (
          <Link as={NextLink} href={href}>
            {text}
          </Link>
        )
      },
      link: ({ mark, children }) => {
        // Read https://css-tricks.com/use-target_blank/
        const { blank, href } = mark
        const text = children.length ? children[0] : children
        return blank ? (
          <Link as={NextLink} href={href} isExternal>
            {text}
          </Link>
        ) : (
          <Link as={NextLink} href={href}>
            {text}
          </Link>
        )
      },
    },
    types: {
      block: BlockRenderer,
    },
  }

  return <BlockContent blocks={props.blocks} serializers={serializers} />
}
