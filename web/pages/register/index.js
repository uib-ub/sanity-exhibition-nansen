import Head from 'next/head'
import { getRegistry } from '../../lib/api'
import Layout from '../../components/Layout'
import { Badge, Heading, Container, List, ListItem, useColorModeValue } from '@chakra-ui/react'
import Link from '../../components/Link'
import { sortBy } from 'lodash'

export default function Register({ data, preview }) {
  const tagColor = useColorModeValue('blackAlpha', 'red')

  const sortedItems = sortBy(data.items, 'label.no')

  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>
        <title>Register - {data.siteSettings.title}</title>
      </Head>

      <Container my="5" maxW="6xl">
        <Heading
          fontSize={['2xl', '3xl', '4xl', '5xl']}
          py="5"
          mb="5"
          borderBottom="solid 1px"
          borderColor="gray.300"
        >
          Register
        </Heading>

        {sortedItems && (
          <List py={['2', null, '5']} sx={{ columnCount: [1, 1, 2, 3, 3] }} fontSize="xl">
            {sortedItems.map((item) => (
              <ListItem
                key={item._id}
                display="flex"
                mb="1"
                _before={{
                  backgroundImage: 'radial-gradient(circle, #aaa 1px, transparent 1px)',
                  backgroundPosition: 'bottom',
                  backgroundSize: '1ex 1.5px',
                  backgroundRepeat: 'space no-repeat',
                  content: '""',
                  flexGrow: '1',
                  height: '1em',
                  order: '2',
                  mt: '2px',
                  alignSelf: 'flex-start',
                  justifySelf: 'self-end',
                }}
              >
                <Link href={`/id/${item._id}`} order="1">
                  {item.label.no ?? 'Mangler norsk tittel'}
                </Link>
                <Badge
                  alignSelf="flex-start"
                  justifySelf="self-end"
                  order="2"
                  ml="3"
                  colorScheme={tagColor}
                  fontSize="0.8em"
                >
                  {item.count}
                </Badge>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getRegistry(preview)
  return {
    props: { data, preview },
  }
}
