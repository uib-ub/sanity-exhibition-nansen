import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/Layout'
import {getIdPaths, getId, getType} from '../../lib/api'
import Head from 'next/head'
import RenderDocument from '../../components/Documents/RenderDocument'


export default function Document({data, preview}) {
  const router = useRouter()
  if (!router.isFallback && !data.item._id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>
        <title>{`${data.item?.label?.no || data.item.label}`}</title>
        <script type="application/ld+json">
          {JSON.stringify(data.item, null, 2)}
        </script>
      </Head>

      {router.isFallback ? (
        'Loading…'
      ) : (
        <>
          {data.item && <RenderDocument document={data.item} />}
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({params, preview = false}) {
  const type = await getType(params.id, preview)
  const data = await getId(params.id, type, preview)
  return {
    props: {
      preview,
      data: data || null,
    },
  }
}

export async function getStaticPaths() {
  const all = await getIdPaths()
  return {
    paths:
      all?.map((item) => ({
        params: {
          id: item._id,
        },
      })) || [],
    fallback: false,
  }
}
