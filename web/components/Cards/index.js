import {Grid} from '@chakra-ui/react'
import Card from './Card'

export default function Cards(props) {
  if (!props && props.items) {
    return null
  }

  const {items} = props

  return (
    <Grid
      maxW="full"
      px="4"
      boxSizing="border-box"
      overflowX="hidden"
      gap={5}
      templateColumns={{
        base: "repeat(auto-fill, 1fr)",
        md: "repeat(auto-fill, minmax(220px, 1fr))", 
        lg: "repeat(auto-fill, 1fr)", 
        xl: "repeat(auto-fill, minmax(300px,1fr))"
      }}
      autoFlow="dense"
    >
      {items.map((item, index) => (
        <Card key={index} item={item} />  
      ))}
    </Grid>
  )
}
