import { getSiteSettings } from '../../lib/api'
import Layout from '../../components/Layout'
import { Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const MiradorWithNoSSR = dynamic(() => import('../../components/MiradorViewer'), { ssr: false })

export default function Mirador({ data, preview }) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container h="100vh" m="0" p="0" maxWidth="full">
        <MiradorWithNoSSR
          variant="catalog"
          workspaceControlPanel="true"
          catalog="http://localhost:3000/api/collection"
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
