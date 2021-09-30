import Head from 'next/head'
import { imageBuilder } from '../../lib/sanity'
import { getAllActors } from '../../lib/api'
import { Grid, Avatar, Box, Heading, Flex, Badge, Container } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Link from '../../components/Link'
import PortableTextBlock from '../../components/PT/PortableTextBlock'
import { sortBy } from 'lodash'

export default function Actors({ data, preview }) {
  /* let actors = data.items.reduce((r, e) => {
    // get first letter of name of current element
    let group = e.label[0];
    // if there is no property in accumulator with this letter create it
    if(!r[group]) r[group] = {group, children: [e]}
    // if there is push current element to children array for that letter
    else r[group].children.push(e);
    // return accumulator
    return r;
  }, {})
  
  // since data at this point is an object, to get array of values
  // we use Object.values method
  let result = Object.values(actors) */

  const sortedItems = sortBy(data.items, 'label.no')

  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>
        <title>Aktører</title>
      </Head>

      <Container maxW="6xl">
        <Heading
          fontSize={['2xl', '3xl', '4xl', '5xl']}
          py="5"
          mb="5"
          borderBottom="solid 1px"
          color="gray.600"
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
