import { Box } from '@chakra-ui/react'
import Link from '../Link'
import PortableTextBlock from '../PortableTextBlock'
import Timespan from '../Timespan'

export default function Joining(props) {
  const {joined, joinedWith, timespan, tookplaceAt} = props
  return (
    <Box maxW={["lg",null, null, null, "2xl"]}>
      <Timespan display="inline-block" fontWeight="bolder" timespan={timespan} /> – <Link href={`id/${joined._id}`}>{joined.label}</Link> blir medlem av <Link href={`id/${joinedWith._id}`}>{joinedWith.label}</Link>.
    </Box>
  )
}
