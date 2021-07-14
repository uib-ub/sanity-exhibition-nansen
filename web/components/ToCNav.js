import React from 'react'
import NextLink from 'next/link'
import _ from 'lodash'
import {List, ListItem, Link, OrderedList} from '@chakra-ui/react'

const ListItemRenderer = (props) => {
  if(!props) { return null}
  const {id, text} = props
  return (
    <ListItem>
      <Link href={`#${id}`}>{text}</Link>
    </ListItem>)
}

export default function ToCNav(props) {
  if (!props.blocks || !Array.isArray(props.blocks) || !props.blocks.length) {
    return null
  }
  const {blocks} = props

  const headings = blocks.filter(b => /^h\d/.test(b.style)).map(h => {
    return {
      id: _(h.children[0].text).kebabCase(),
      text: _(h.children[0].text).trim(),
      level: h.style
    }
  })

  console.log('Headings', headings)
  
  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
  
    headingElements.forEach((heading, index) => {
      const { id, text, level } = heading;
  
      if (heading.level === "h2") {
        nestedHeadings.push({ id, text, items: [] });
      } else if (heading.level === "h3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          text,
        });
      }
    });
  
    return nestedHeadings;
  };

  const list = getNestedHeadings(headings)

  return (
    <OrderedList>
      {list.map((heading) => (
        <List key={heading.id}>
          <Link href={`#${heading.id}`}>{heading.text}</Link>
          {heading.items.length > 0 && (
            <OrderedList>
              {heading.items.map((child) => (
                <List key={child.id}>
                  <Link href={`#${child.id}`}>{child.text}</Link>
                </List>
              ))}
            </OrderedList>
          )}
        </List>
      ))}
    </OrderedList>
  )
}
