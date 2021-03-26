import {getAllHumanMadeObjects} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Cards from '../../components/Cards'
import {Heading} from '@chakra-ui/react'

export default function Items({data, preview}) {
  const {items, siteSettings} = data
  return (
    <Layout preview={preview} site={siteSettings}>
      <Head>
        <title>Ting – {siteSettings.title}</title>
      </Head>

      <Heading 
        py="10" 
        fontSize={["2xl", "4xl", "5xl", "6xl"]} 
        textAlign="center"
      >
        Ting
      </Heading>

      <Cards items={items} />
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllHumanMadeObjects(preview)
  return {
    props: {data, preview},
  }
}
