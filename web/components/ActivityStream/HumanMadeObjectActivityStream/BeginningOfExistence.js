import { Box, Heading } from '@chakra-ui/react'
import Link from '../../Link'
import PortableTextBlock from '../../PortableTextBlock'
import Timespan from '../../Timespan'

export default function BeginningOfExistence(props) {
  const {_id, _key, label, timespan, tookplaceAt} = props
  const id = _id ?? _key
  
  return (
    <Box border="1px solid" borderColor="gray.200" backgroundColor="gray.100" p="3">
      <Heading 
        as="h3" 
        fontSize="md" 
        pb="1"
        mb="2"
        borderBottom="1px solid" 
        borderColor="gray.300" 
      >
        {label ? label : "Skapt"}
      </Heading>
      {timespan && (<Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />)}
    </Box>
  )
}
