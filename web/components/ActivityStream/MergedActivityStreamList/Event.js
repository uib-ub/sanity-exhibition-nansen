import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Event(props) {
  const {_id, _key, label, timespan, tookplaceAt} = props
  const id = _id ?? _key

  return (
    <>
      {timespan ? <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} /> : <Box></Box>} 
      <Box>
        <Link href={`id/${_id}`}>{label ?? 'Mangler norsk navn'}</Link>
      </Box>
    </>
  )
}
