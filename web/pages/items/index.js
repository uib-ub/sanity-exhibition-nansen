import {getAllHumanMadeObjects} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import {Container, Heading} from '@chakra-ui/react'

export default function Items({data, preview}) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container maxW="full" p="0" centerContent>
        <Heading py="10" fontSize={["2xl", "4xl", "5xl", "6xl"]}>Ting</Heading>
        <Cards items={data.items} />
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
