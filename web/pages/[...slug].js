import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { usePreviewSubscription } from '../lib/sanity'
import { routeQuery } from '../lib/queries/routeQuery'
import { getClient } from '../lib/sanity.server'
import { getRoutes } from '../lib/api'
import { Container, Text, useColorModeValue } from '@chakra-ui/react'
import Date from '../components/Date'
import Layout from '../components/Layout'
import Sections from '../components/Sections/Sections'
import PortableTextBlock from '../components/PT/PortableTextBlock'
import Footnotes from '../components/Layout/Footnotes'
import { getOpenGraphImages } from '../lib/utils'
// import TableOfContent from '../components/Layout/TableOfContent'

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 */
function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) return data

  return data.route.length > 1 && preview
    ? data.route.filter((item) => item._id.startsWith(`drafts.`)).slice(-1)[0]
    : data.route.slice(-1)[0]
}

export default function Page({ data, preview }) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  const timestampColor = useColorModeValue('grey.700', 'grey.100')

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)
  // console.log(JSON.stringify(page, null, 2))

  const openGraphImages = getOpenGraphImages(
    page?.route[0]?.page?.image,
    page?.route[0]?.page?.label,
  )

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!
  return (
    <Layout preview={preview} site={page?.siteSettings}>
      <NextSeo
        title={page?.route[0]?.page?.label ?? page?.route[0]?.page?.title}
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={page?.route[0]?.page?.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/${page?.route[0].slug.current}`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/${page?.route[0].slug.current}`,
          title: page?.route[0]?.page?.label,
          description: page?.route[0]?.page?.excerpt,
          images: openGraphImages,
          site_name: page?.siteSettings?.title,
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />
      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
      <Head>
        <title>
          {`${page?.route[0]?.page?.label ?? page?.route[0]?.page?.title}
           - ${page?.siteSettings?.title}`}
        </title>
      </Head>

      <Container maxWidth="full" px="0">
        {/* A Page  */}
        {page?.route[0]?.page?.content && <Sections sections={page.route[0].page.content} />}

        {/* If LinguisticDocument the content is in the body field */}
        {page?.route[0]?.page?.body && <PortableTextBlock blocks={page.route[0].page.body} />}

        {page?.route[0]?.page?.body && <Footnotes blocks={page.route[0].page.body} />}

        {/* Add TOC */}
        {/* {page?.route[0]?.page?.body && (
          <Box position="fixed" left="10" top="50vh" display={{ base: 'none', md: 'inherit' }}>
            <TableOfContent blocks={page?.route[0].page.body} />
          </Box>
        )} */}

        <Container
          maxWidth={['xl', null, 'xl', null]}
          borderTopColor="blackAlpha.300"
          borderTopWidth="1px"
          mt="10"
          centerContent
        >
          <Text mt="10" color={timestampColor} fontSize="sm">
            Oppdatert <Date>{page?.route[0]?.page?._updatedAt}</Date>
          </Text>
        </Container>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  // const data = await getRoute(preview, params.slug
  // console.log(params)
  const slug = typeof params.slug === 'string' ? params.slug : params.slug.join('/')
  const query = routeQuery
  const queryParams = { slug: slug }
  const data = await getClient(preview).fetch(query, queryParams)
  // console.log(JSON.stringify(data, null, 2))

  // Escape hatch, if our query failed to return data
  if (!data) return { notFound: true }

  // Helper function to reduce all returned documents down to just one
  const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      // Pass down the "preview mode" boolean to the client-side
      preview,
      // Pass down the initial content, and our query
      data: { page, query, queryParams },
    },
  }
}

export async function getStaticPaths() {
  const routes = await getRoutes()
  return {
    paths:
      routes?.map((item) => ({
        params: {
          slug: item.slug.current.split('/'),
        },
      })) || [],
    fallback: false,
  }
}
