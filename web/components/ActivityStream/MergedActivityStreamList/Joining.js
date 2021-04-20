import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import PortableTextBlock from '../../PortableTextBlock'
import Timespan from '../../Timespan'

export default function Joining(props) {
  const {_id, _key, joined, joinedWith, timespan, tookplaceAt} = props
  const id = _id ?? _key

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${joined._id}`}>{joined.label}</Link> blir medlem av <Link href={`id/${joinedWith._id}`}>{joinedWith.label}</Link>
      </Box>
    </>
  )
}
