import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { getFrontpage } from '../lib/api'
import Layout from '../components/Layout'
import RenderSections from '../components/Sections/RenderSection'
import { Container } from '@chakra-ui/react'
import { getOpenGraphImages } from '../lib/utils'

export default function Index({ data, preview }) {
  const openGraphImages = getOpenGraphImages(
    data?.siteSettings?.openGraph?.image,
    data?.siteSettings?.title,
  )
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>{data?.siteSettings?.title && <title>{data.siteSettings.title}</title>}</Head>
      <NextSeo
        title={data?.siteSettings?.title}
        description={data?.siteSettings?.openGraph?.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}`,
          title: data?.siteSettings?.title,
          description: data?.siteSettings?.openGraph?.description,
          images: openGraphImages,
          site_name: data?.siteSettings?.title,
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />
      <Container maxWidth="full" px="0">
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
