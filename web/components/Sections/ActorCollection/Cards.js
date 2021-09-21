import { Grid } from '@chakra-ui/react'

export default function ActorCollectionCards({ children }) {
  if (!children) {
    return null
  }

  return (
    <Grid
      maxW={['xl', '2xl', '4xl', '5xl']}
      as="section"
      gap={5}
      templateColumns={{
        base: 'repeat(auto-fill, minmax(220px, 1fr))',
        sm: 'repeat(auto-fill, minmax(220px, 1fr))',
        md: 'repeat(auto-fill, minmax(240px, 1fr))',
        lg: 'repeat(auto-fill, 1fr)',
        xl: 'repeat(auto-fill, minmax(300px,1fr))',
      }}
      autoFlow="dense"
    >
      {children}
    </Grid>
  )
}
