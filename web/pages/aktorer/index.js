import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { imageBuilder } from '../../lib/sanity'
import { getAllActors } from '../../lib/api'
import { Grid, Avatar, Box, Heading, Flex, Badge, Container } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Link from '../../components/Link'
import PortableTextBlock from '../../components/PT/PortableTextBlock'
import { sortBy } from 'lodash'
import { getOpenGraphImages } from '../../lib/utils'

export default function Actors({ data, preview }) {
  const sortedItems = sortBy(data.items, 'label.no')
  const openGraphImages = getOpenGraphImages(
    data?.siteSettings?.openGraph?.image,
    data?.siteSettings?.title,
  )
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <NextSeo
        title="Aktører"
        titleTemplate={`%s | ${data?.siteSettings?.title}`}
        defaultTitle={data?.siteSettings?.title}
        description={data?.siteSettings?.openGraph?.description}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/register`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_BASE_PATH}/register`,
          title: data?.siteSettings?.title,
          description: data?.siteSettings?.openGraph?.description,
          images: openGraphImages,
          site_name: data?.siteSettings?.title,
        }}
        twitter={{
          handle: '@UiB_UB',
          site: '@UiB_UB',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <title>Aktører</title>
      </Head>

      <Container maxW="6xl">
        <Heading
          fontSize={['2xl', '3xl', '4xl', '5xl']}
          py="5"
          mb="5"
          borderBottom="solid 1px"
          borderColor="gray.300"
        >
          Aktører
        </Heading>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {sortedItems &&
            sortedItems
              .filter((item) => item.count > 0)
              .map((item) => (
                <Flex key={item._id}>
                  <Avatar
                    size="lg"
                    name={item.label.no}
                    src={imageBuilder.image(item.image).height('200').width('200').url()}
                  />
                  <Box p={2}>
                    <Heading size="md">
                      <Link href={`/id/${item._id}`}>{item.label.no ?? 'Mangler norsk navn'}</Link>
                    </Heading>
                    <Box d="flex" alignItems="baseline">
                      {item.hasType &&
                        item.hasType.map((type) => (
                          <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                            {type.label.no}
                          </Badge>
                        ))}

                      {!item.hasType && (
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          Person
                        </Badge>
                      )}

                      {item.referredToBy?.map((ref) => (
                        <PortableTextBlock key={ref._key} blocks={ref.body} />
                      ))}
                    </Box>
                  </Box>
                </Flex>
              ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllActors(preview)
  return {
    props: { data, preview },
  }
}
