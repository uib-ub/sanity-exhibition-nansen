import {Flex} from '@chakra-ui/react'
import PortableTextBlock from './PortableTextBlock'

export default function Alert({alert, preview}) {
  if (!alert && preview === false) {
    return null
  }


  return (
    <Flex>
      <div className="py-2 text-center text-sm">
        {preview && (
          <>
            This page is a preview.{' '}
            <a
              href="/api/exit-preview"
              className="underline hover:text-cyan duration-200 transition-colors"
            >
              Click here
            </a>{' '}
            to exit preview mode.
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
