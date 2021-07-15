import { Flex } from '@chakra-ui/react'
import Link from './Link'
import PortableTextBlock from './PortableTextBlock'

export default function Alert({ alert, preview }) {
  if (!alert && preview === false) {
    return null
  }

  return (
    <Flex>
      <div>
        {preview && (
          <>
            This page is a preview. <Link href="/api/exit-preview">Click here</Link> to exit preview
            mode.
          </>
        )}

        {alert && (
          <>
            <PortableTextBlock blocks={alert?.item?.content} />
          </>
        )}
      </div>
    </Flex>
  )
}
