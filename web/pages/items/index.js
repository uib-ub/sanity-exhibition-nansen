import {getAllHumanMadeObjects} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import {Container, Heading} from '@chakra-ui/react'

export default function Items({data, preview}) {
  const {items, siteSettings} = data
  return (
    <Layout preview={preview} site={siteSettings}>
      <Head>
        <title>Ting – {siteSettings.title}</title>
      </Head>

      <Container my="5" maxWidth="6xl">
        <Heading 
          pb="5"
          mb="5"
          borderBottom="solid 1px"
          color="gray.600"
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

export async function getStaticProps({preview = false}) {
  const data = await getAllHumanMadeObjects(preview)
  return {
    props: {data, preview},
  }
}
