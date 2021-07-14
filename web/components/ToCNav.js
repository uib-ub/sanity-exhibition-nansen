import React from 'react'
import NextLink from 'next/link'
import _ from 'lodash'
import {ListItem, Link, OrderedList} from '@chakra-ui/react'

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
      level: h.style.substring(1)
    }
  })

  console.log('Headings', headings)
  
  function buildTree(headers) {
    let list = [];
    let nextLevelHeaders = [];
    let lastLevel = -1;
  
    if (headers.length === 0) {
      return "";
    }
  
    const buildSubTree = () => {
      console.log(list, nextLevelHeaders, lastLevel)
      if (nextLevelHeaders.length > 0) {
        list[list.length] += buildTree(nextLevelHeaders);
      }
    };
  
    headers.forEach(h => {
      if (lastLevel !== -1 && lastLevel < h.level) {
        nextLevelHeaders.push(h);
        return;
      }
  
      buildSubTree();
  
      lastLevel = h.level;
      list.push(<ListItem>
        <Link href={`#${h.id}`}>{h.text}</Link>
      </ListItem>);
      nextLevelHeaders = [];
    });
  
    buildSubTree();

    console.log(list)

    return (
      <OrderedList>
        {list.map(l => (l))}
      </OrderedList>
    );
  }
  const nav = buildTree(headings)
  console.log(nav)

  return (
     <div>
       {nav}
     </div>
  )
}
