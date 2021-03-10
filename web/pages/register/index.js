import {CMS_NAME} from '../../lib/constants'
import {getRegistry} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {Container, List, ListItem} from '@chakra-ui/react'
import Link from '../../components/Link'

export default function Register({data, preview}) {
  return (
    <>
      <Layout preview={preview} site={data.siteSettings}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>

        <Container maxW="xl">
          {data.items && (
            <List fontSize="xl">
              {data.items
                .filter((item) => item.count > 0)
                .map((item) => (
                  <ListItem key={item._id}>
                    <Link href={`/id/${item._id}`}>{item.label.nor ?? item.label}</Link> <span>{item.count}</span>
                  </ListItem>
                ))}
            </List>
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getRegistry(preview)
  return {
    props: {data, preview},
  }
}
