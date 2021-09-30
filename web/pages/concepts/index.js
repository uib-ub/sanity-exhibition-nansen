import Head from 'next/head'
import { getAllConcepts } from '../../lib/api'
import Layout from '../../components/Layout'
import { Container, List, ListItem } from '@chakra-ui/react'
import Link from '../../components/Link'

export default function Concepts({ data, preview }) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>
        <title>Emner - {data.siteSettings.title}</title>
      </Head>
      <Container maxW="xl">
        {data.items && (
          <List fontSize="xl">
            {data.items
              .filter((item) => item.count > 0)
              .map((item) => (
                <ListItem key={item._id}>
                  <Link href={`/id/${item._id}`}>{item.label.no}</Link> <span>{item.count}</span>
                </ListItem>
              ))}
          </List>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllConcepts(preview)
  return {
    props: { data, preview },
  }
}
