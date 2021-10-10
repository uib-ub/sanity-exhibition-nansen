import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { orderBy } from 'lodash'
import { getEvents } from '../../lib/api'
import Layout from '../../components/Layout'
import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import RenderMergedActivityStreamList from '../../components/ActivityStream/MergedActivityStreamList/RenderMergedActivityStreamList'
import { getOpenGraphImages } from '../../lib/utils'

export default function Events({ data, preview }) {
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
      <Head>
        <title>Hendelser - {data.siteSettings.title}</title>
      </Head>
      <Container my="5" maxWidth="6xl">
        <Heading
          fontSize={['2xl', '3xl', '4xl', '5xl']}
          py="5"
          mb="5"
          borderBottom="solid 1px"
          borderColor="gray.300"
        >
          Hendelser
        </Heading>

        {data.items && (
          <SimpleGrid
            w="full"
            columnGap="5"
            templateColumns={{ base: '1fr', md: 'auto 1fr' }}
            fontSize={['xl', null, '2xl', null]}
          >
            {' '}
            <RenderMergedActivityStreamList stream={data.items} />{' '}
          </SimpleGrid>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  let data = await getEvents(preview)
  data.items = orderBy(data.items, ['timespan[0].orderDate'])

  return {
    props: { data, preview },
  }
}
