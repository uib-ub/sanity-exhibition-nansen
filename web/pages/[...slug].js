import Head from 'next/head'
import { usePreviewSubscription } from '../lib/sanity'
import { routeQuery } from '../lib/queries/routeQuery'
import { getClient } from '../lib/sanity.server'
import { getRoutes } from '../lib/api'
import { Container, Text } from '@chakra-ui/react'
import Date from '../components/Date'
import Layout from '../components/Layout'
import Sections from '../components/Sections/Sections'
import PortableTextBlock from '../components/PT/PortableTextBlock'
import Footnotes from '../components/Layout/Footnotes'
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

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)
  // console.log(JSON.stringify(page, null, 2))

  // Notice the optional?.chaining conditionals wrapping every piece of content?
  // This is extremely important as you can't ever rely on a single field
  // of data existing when Editors are creating new documents.
  // It'll be completely blank when they start!
  return (
    <Layout preview={preview} site={page?.siteSettings}>
      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
      <Head>
        <title>{page.route[0].page.label + ' - ' + page.siteSettings.title}</title>
      </Head>

      <Container maxWidth="full" centerContent>
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

        <Text mt="10" color="gray.500" fontSize="sm">
          Oppdatert: <Date>{page?.route[0]?.page?._updatedAt}</Date>
        </Text>
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
