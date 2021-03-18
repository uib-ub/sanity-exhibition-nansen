import {getAllHumanMadeObjects} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import {Center, Heading} from '@chakra-ui/react'

export default function Items({data, preview}) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Center py="10">
        <Heading fontSize={["2xl", "4xl", "5xl", "6xl"]}>Ting</Heading>
      </Center>
      <Cards items={data.items} />
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllHumanMadeObjects(preview)
  return {
    props: {data, preview},
  }
}
