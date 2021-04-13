import {Heading} from '@chakra-ui/react'
import {useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  if(!props || props.disabled === true) {
    return null
  }

  return (
    <>
      <Heading 
        py="5"
        mb="5"
        borderBottom="solid 1px"
        color="gray.700"
        borderColor="gray.300"
        fontSize={["2xl", "3xl", "4xl", "5xl"]}
        textTransform="uppercase"
      >
        {props.title}
      </Heading>
      
      {props?.subtitle && (
        <PortableTextBlock blocks={props.subtitle} />
      )}
    </>
  )
}
