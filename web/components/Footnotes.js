import React from 'react'
import PortableTextBlock from './PortableTextBlock'

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

  if (notes.length > 0) {
    return null
  }

  return (
    <ol>
      {notes.map(({ _key, text }) => (
        // the _key is what markKey refers to in the main text component
        <li id={`${_key}`} key={_key}>
          <PortableTextBlock blocks={text} />
        </li>
      ))}
    </ol>
  )
}

export default Footnotes
