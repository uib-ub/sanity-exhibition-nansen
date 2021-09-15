import { Container, Text } from '@chakra-ui/react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export default function Alert() {
  return (
    <Container bgColor="red.600" color="white" maxW="full" pt="2" centerContent>
      <Text fontSize="md">
        This page is a preview. <a href={`${basePath}/api/exit-preview`}>Click here</a> to exit
        preview mode.
      </Text>
    </Container>
  )
}
