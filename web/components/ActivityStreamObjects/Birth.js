import { Box } from '@chakra-ui/react'
import Link from '../Link'
import PortableTextBlock from '../PortableTextBlock'
import Timespan from '../Timespan'

export default function Birth(props) {
  const {broughtIntoLife, timespan, tookplaceAt} = props
  return (
    <Box maxW={["lg",null, null, null, "2xl"]}>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} /> – <Link href={`id/${broughtIntoLife._id}`}>{broughtIntoLife.label}</Link> blir født.
    </Box>
  )
}
