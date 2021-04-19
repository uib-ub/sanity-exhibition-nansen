import { Box } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import Timespan from '../Timespan'

export default function Event(props) {
  const {label, timespan, tookplaceAt} = props
  return (
    <Box maxW={["lg",null, null, null, "2xl"]}>
      {timespan && (<><Timespan display="inline-block" fontWeight="bolder" timespan={timespan} /> – </>)}{label}
    </Box>
  )
}
