import { Grid } from '@chakra-ui/react'

export default function ActorCollectionCards({ children }) {
  if (!children) {
    return null
  }

  return (
    <Grid
      maxW={['xl', '2xl', '4xl', '5xl']}
      as="section"
      autoFlow="column"
      gap={5}
      autoColumns="300px"
      templateRows="auto auto"
      overflowX="scroll"
      py="4"
      borderRightWidth="2px"
      borderRightColor="gray.400"
    >
      {children}
    </Grid>
  )
}
