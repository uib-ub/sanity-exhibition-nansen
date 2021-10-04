import { Container } from '@chakra-ui/react'
import React from 'react'
import PortableTextBlock from '../PT/PortableTextBlock'

function Footnotes({ blocks }) {
  const notes = blocks
    // filter out everything that's not a text block
    .filter(({ _type }) => _type === 'block')
    // make an array of the mark definitions of those blocks
    .reduce((acc, curr) => {
      return [...acc, ...curr.markDefs]
    }, [])
    // find all the footnote mark definitions
    .filter(({ _type }) => _type === 'footnote')

  // console.log(JSON.stringify(notes, null, 2))

  if (notes.length == 0) {
    return null
  }

  return (
    <Container
      maxWidth={['md', null, 'xl', null]}
      borderTopColor="blackAlpha.300"
      borderTopWidth="1px"
      mt="10"
      pt="10"
    >
      <ol>
        {notes.map(({ _key, text }) => (
          // the _key is what markKey refers to in the main text component
          <li id={`${_key}`} key={_key}>
            <PortableTextBlock fontSize={['md', null, 'lg', null]} blocks={text} />
          </li>
        ))}
      </ol>
    </Container>
  )
}

export default Footnotes
