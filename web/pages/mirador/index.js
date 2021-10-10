import { getSiteSettings } from '../../lib/api'
import Layout from '../../components/Layout'
import { Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { getOpenGraphImages } from '../../lib/utils'

const MiradorWithNoSSR = dynamic(() => import('../../components/MiradorViewer'), { ssr: false })

export default function Mirador({ data, preview }) {
  const openGraphImages = getOpenGraphImages(
    data?.siteSettings?.openGraph?.image,
    data?.siteSettings?.title,
  )
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <NextSeo
        title="Hendelser"
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={data?.siteSettings?.openGraph?.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/register`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/register`,
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
