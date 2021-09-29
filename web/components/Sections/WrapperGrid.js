import { Grid } from '@chakra-ui/react'

export default function WrapperGrid({ children }) {
  if (!children) {
    return null
  }

  return (
    <Grid
      maxW={['xl', '4xl', '4xl', '6xl']}
      my={{ base: '6', md: '16', lg: '16', xl: '20' }}
      borderBottom={{ base: 'solid 1px', md: 'none' }}
      borderColor="gray.200"
      gridGap={5}
      gridTemplateAreas={{ base: '"image" "metadata"', xl: '"image metadata"' }}
      gridTemplateColumns={{ base: 'auto', xl: '10fr 3fr' }}
      gridTemplateRows="1fr auto"
      mx="auto"
      px="4"
    >
      {children}
    </Grid>
  )
}
