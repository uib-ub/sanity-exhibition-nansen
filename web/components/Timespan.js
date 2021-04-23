import {Box, Grid, Heading} from '@chakra-ui/react'
import PortableTextBlock from './PortableTextBlock'

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export default function Timespan(props) {
  if (!props && props.timespan) return null

  const {timespan, ...rest} = props

  return (
    <Box {...rest}>
      {timespan.map((time) => (
        <Box key={time._key}>
          {time.date && formatDate(time.date)}

          {time.beginOfTheBegin && formatDate(time.beginOfTheBegin)}

          {time.endOfTheBegin && formatDate(time.endOfTheBegin)}

          {time.beginOfTheBegin && time.endOfTheEnd && <span>&nbsp;~&nbsp;</span>}

          {time.beginOfTheEnd && formatDate(time.beginOfTheEnd)}

          {time.endOfTheEnd && formatDate(time.endOfTheEnd)}

          {time.description?.nor && <PortableTextBlock blocks={time.description.nor} />}
        </Box>
      ))}
    </Box>
  )
}
