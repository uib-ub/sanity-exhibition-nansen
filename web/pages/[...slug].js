import { getRoute, getRoutes } from '../lib/api'
import { Container, Text } from '@chakra-ui/react'
import Date from '../components/Date'
import Layout from '../components/Layout'
import Sections from '../components/Sections/Sections'
import PortableTextBlock from '../components/PortableTextBlock'
import TableOfContent from '../components/TableOfContent'

export default function Page({ data, preview }) {
  const { content, body, _updatedAt } = data.route.page

  // TODO: Send page info to header?

  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container maxWidth="4xl" centerContent>
        <TableOfContent blocks={body} />

        {/* A Page  */}
        {content && <Sections sections={content} />}

        {/* If LinguisticDocument the content is in the body field */}
        {body && <PortableTextBlock blocks={body} />}

        <Text mt="5" color="gray.500" fontSize="sm">
          Oppdatert: <Date>{_updatedAt}</Date>
        </Text>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getRoute(preview, params.slug)
  return {
    props: { data, preview },
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
