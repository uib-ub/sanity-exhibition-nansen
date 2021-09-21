import Head from 'next/head'
import { getFrontpage } from '../lib/api'
import Layout from '../components/Layout'
import RenderSections from '../components/Sections/RenderSection'
import { Container } from '@chakra-ui/react'

export default function Index({ data, preview }) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>{data?.siteSettings?.title && <title>{data.siteSettings.title}</title>}</Head>
      <Container maxW="full">
        {data.frontpage.content && <RenderSections sections={data.frontpage.content} />}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getFrontpage(preview)
  return {
    props: { data, preview },
  }
}
