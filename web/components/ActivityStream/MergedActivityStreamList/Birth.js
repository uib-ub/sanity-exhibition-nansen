import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import PortableTextBlock from '../../PortableTextBlock'
import Timespan from '../../Timespan'

export default function BeginningOfExistence(props) {
  const {_id, _key, broughtIntoLife, timespan, tookplaceAt} = props
  const id = _id ?? _key
  
  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${broughtIntoLife._id}`}>{broughtIntoLife.label}</Link> blir født.
      </Box>
    </>
  )
}
