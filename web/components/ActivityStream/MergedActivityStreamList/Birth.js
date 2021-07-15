import { Box } from '@chakra-ui/react'
import Link from '../../Link'
import Timespan from '../../Timespan'

export default function Birth(props) {
  // console.log(props)
  if (!props.broughtIntoLife) {
    return null
  }

  const { broughtIntoLife, timespan } = props

  return (
    <>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} />
      <Box>
        <Link href={`id/${broughtIntoLife._id}`}>
          {broughtIntoLife.label.no ?? 'Mangler norsk navn'}
        </Link>{' '}
        blir født.
      </Box>
    </>
  )
}
