import {getRegistry} from '../../lib/api'
import Layout from '../../components/Layout'
import {Badge, Heading, Container, List, ListItem} from '@chakra-ui/react'
import Link from '../../components/Link'

export default function Register({data, preview}) {
  return (
    <>
      <Layout preview={preview} site={data.siteSettings}>
        <Container maxW="fill" py="10" centerContent>
          <Heading fontSize={["2xl", "4xl", "5xl", "6xl"]}>Register</Heading>
          
          {data.items && (
            <List 
              py="10"
              sx={{ columnCount: [1, 2, 2, 3] }}
              fontSize="xl"
            >
              {data.items
                .filter((item) => item.count > 0)
                .map((item) => (
                  <ListItem key={item._id}>
                    <Link href={`/id/${item._id}`}>{item.label.nor ?? item.label}</Link>
                    <Badge 
                      ml="3"
                      colorScheme="blackAlpha"
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
    </>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getRegistry(preview)
  return {
    props: {data, preview},
  }
}
