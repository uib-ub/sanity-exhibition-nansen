import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Death(props) {
  // console.log(props)
  if (!props.deathOf) {
    return null
  }
  const { deathOf, timespan } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${deathOf._id}`}>{deathOf.label.no ?? 'Mangler norsk navn'}</Link> dør
      </Box>
    </>
  )
}
