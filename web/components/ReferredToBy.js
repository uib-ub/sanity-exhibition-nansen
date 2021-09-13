import { Box } from '@chakra-ui/react'
import PortableTextBlock from './PT/PortableTextBlock'
import { orderBy } from 'lodash'

export default function ReferredToBy(props) {
  if (!props) {
    return null
  }

  props.array?.map((obj) => (obj.lang = obj.language._identifiedByISO6393))

  let sorted = []
  if (props.array) {
    sorted = orderBy(props?.array, ['lang'], ['desc'])
  }

  return (
    <>
      {sorted?.map((ref) => (
        <Box key={ref._key ? ref._key : ref._id} maxW="xl" marginBottom={5}>
          {/* <Box>
            {ref.hasType[0].label.no} - {ref.language.label.no}
          </Box> */}
          <PortableTextBlock
            blocks={ref.body}
            fontFamily="Montserrat"
            fontWeight="light"
            fontSize={{ base: 'md', sm: 'lg', md: 'lg', xl: 'xl' }}
          />
        </Box>
      ))}
      {props.description && <PortableTextBlock description={props.description} />}
    </>
  )
}
