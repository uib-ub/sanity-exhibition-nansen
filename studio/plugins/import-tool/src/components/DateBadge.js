import React from 'react'
import {parse, format} from 'date-fns'
import {Text} from '@sanity/ui'

const DateBadge = (props) => {
  if (!props.date || props.date.length !== 8) {
    return null
  }

  const parsedDate = parse(props.date, 'yyyyMMdd', new Date())
  const formatedDate = format(parsedDate, 'd. MMMM yyyy')

  return <Text size={1}>{formatedDate}</Text>
}

export default DateBadge
