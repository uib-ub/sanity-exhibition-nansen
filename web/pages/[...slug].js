import {getRoute, getRoutes} from '../lib/api'
import Layout from '../components/Layout'
import Sections from '../components/Sections/Sections'
import PortableTextBlock from '../components/PortableTextBlock'

export default function Page({data, preview}) {
  const {content, body, title} = data.route.page

  return (
    <>
      <Layout preview={preview} site={data.siteSettings}>

        {/* A Page  */}
        {content && <Sections sections={content} />}

        {/* If LinguisticDocument the content is in the body field */}
        {body && <PortableTextBlock blocks={body}/>}
      </Layout>
    </>
  )
}

export async function getStaticProps({params, preview = false}) {
  const data = await getRoute(preview, params.slug)
  console.log(data)
  return {
    props: {data, preview},
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
