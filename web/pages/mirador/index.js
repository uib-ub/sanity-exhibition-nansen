import { getSiteSettings } from '../../lib/api'
import Layout from '../../components/Layout'
import { Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const MiradorWithNoSSR = dynamic(() => import('../../components/MiradorViewer'), { ssr: false })

export default function Mirador({ data, preview }) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container h="80vh" my="5" maxW="full">
        <MiradorWithNoSSR
          height="100%"
          variant="catalog"
          workspaceControlPanel="true"
          catalog={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/collection`}
        />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getSiteSettings(preview)
  return {
    props: { data, preview },
  }
}
