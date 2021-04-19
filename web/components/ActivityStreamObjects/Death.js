import { Box } from '@chakra-ui/react'
import Link from '../Link'
import PortableTextBlock from '../PortableTextBlock'
import Timespan from '../Timespan'

export default function Death(props) {
  const {deathOf, timespan, tookplaceAt} = props
  return (
    <Box maxW={["lg",null, null, null, "2xl"]}>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} /> – <Link href={`id/${deathOf._id}`}>{deathOf.label}</Link> dør.
    </Box>
  )
}
