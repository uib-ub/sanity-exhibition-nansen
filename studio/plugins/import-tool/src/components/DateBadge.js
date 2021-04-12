import React from 'react'
import DefaultBadge from 'part:@sanity/components/badges/default'
import {parse, format} from 'date-fns'

const DateBadge = (props) => {
  if (!props.date || props.date.length !== 8) {
    return null
  }

  const parsedDate = parse(props.date, 'yyyyMMdd', new Date())
  const formatedDate = format(parsedDate, 'd. MMMM yyyy')

  return <DefaultBadge>{formatedDate}</DefaultBadge>
}

export default DateBadge
