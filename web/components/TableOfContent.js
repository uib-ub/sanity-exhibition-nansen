import React from 'react'
import _ from 'lodash'
import { List, ListItem, Link } from '@chakra-ui/react'

export default function TableOfContent(props) {
  if (!props.blocks || !Array.isArray(props.blocks) || !props.blocks.length) {
    return null
  }
  const { blocks } = props

  const headings = blocks
    .filter((b) => /^h\d/.test(b.style))
    .map((h) => {
      return {
        id: _(h.children[0].text).kebabCase(),
        text: _(h.children[0].text).trim(),
        level: h.style,
      }
    })

  console.log('Headings', headings)

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = []

    headingElements.forEach((heading) => {
      const { id, text, level } = heading

      if (level === 'h2') {
        nestedHeadings.push({ id, text, items: [] })
      } else if (level === 'h3' && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          text,
        })
      }
    })

    return nestedHeadings
  }

  const list = getNestedHeadings(headings)

  return (
    <List color="gray.500" listStyleType="disc">
      {list.map((heading) => (
        <ListItem key={heading.id}>
          <Link href={`#${heading.id}`}>{heading.text}</Link>
          {heading.items.length > 0 && (
            <List listStyleType="circle">
              {heading.items.map((child) => (
                <ListItem key={child.id}>
                  <Link href={`#${child.id}`}>{child.text}</Link>
                </ListItem>
              ))}
            </List>
          )}
        </ListItem>
      ))}
    </List>
  )
}
