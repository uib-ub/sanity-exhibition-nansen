import {Grid} from '@chakra-ui/react'
import Card from './Card'

export default function Cards({items}) {
  if (!items) {
    return null
  }

  return (
    <Grid 
      p="5"
      w="full"
      gap={5} 
      templateColumns="repeat(auto-fill, minmax(160px,1fr))"
      /* templateColumns={{base:"repeat(1, 1fr)", md:"repeat(6, 1fr)", xl:"repeat(8, 1fr)"}} */
    >
      {items.map((item, index) => (
        <Card key={index} item={item} />  
      ))}
    </Grid>
  )
}
