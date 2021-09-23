import { Grid } from '@chakra-ui/react'

export default function ActorCollectionCards({ children }) {
  if (!children) {
    return null
  }

  return (
    <Grid
      maxW="100%"
      as="section"
      autoFlow="column"
      gap={5}
      autoColumns="280px"
      templateRows="auto"
      overflowX="scroll"
      py="4"
    >
      {children}
    </Grid>
  )
}
