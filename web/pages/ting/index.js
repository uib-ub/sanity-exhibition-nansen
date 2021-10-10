import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { Container, Heading } from '@chakra-ui/react'
import { getAllHumanMadeObjects } from '../../lib/api'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import { getOpenGraphImages } from '../../lib/utils'

export default function Items({ data, preview }) {
  const { items, siteSettings } = data
  const openGraphImages = getOpenGraphImages(
    data?.siteSettings?.openGraph?.image,
    data?.siteSettings?.title,
  )

  return (
    <Layout preview={preview} site={siteSettings}>
      <NextSeo
        title="Ting"
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
      <Head>
        <title>Ting – {siteSettings.title}</title>
      </Head>

      <Container my="10" maxWidth="6xl">
        <Heading
          pb="5"
          mb="5"
          borderBottom="solid 1px"
          borderColor="gray.300"
          fontSize={['2xl', '3xl', '4xl', '5xl']}
        >
          Ting
        </Heading>

        <Cards items={items} />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllHumanMadeObjects(preview)
  return {
    props: { data, preview },
  }
}
