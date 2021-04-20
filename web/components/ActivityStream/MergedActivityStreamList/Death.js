import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import PortableTextBlock from '../../PortableTextBlock'
import Timespan from '../../Timespan'

export default function Death(props) {
  const {_id, _key, deathOf, timespan, tookplaceAt} = props
  const id = _id ?? _key

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${deathOf._id}`}>{deathOf.label}</Link> dør
      </Box>
    </>
  )
}
