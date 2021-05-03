import {getContactCopy} from '../../lib/api'
import Head from 'next/head'
import {Box, Container, Image, Link, Heading, Text, SimpleGrid, List, ListItem} from '@chakra-ui/react'
import { imageBuilder } from '../../lib/sanity'

export default function ContactCopy({data, preview}) {
  const {tags, siteSettings} = data
  return (
    <>
      <Head>
        <title>Kontaktkopi – {siteSettings.title}</title>
      </Head>

      <Container gridArea="main" my="5" maxWidth="full">
        <Heading 
          pb="5"
          mb="5"
          borderBottom="solid 1px"
          color="gray.600"
          borderColor="gray.300"
          fontSize={["2xl", "3xl", "4xl", "5xl"]}
        >
          <Link href="/">Kontaktkopi for <strong>{siteSettings.title}</strong></Link>
        </Heading>

        {tags && tags.map(tag =>(
          <Box key={tag._id} sx={{pageBreakAfter: "always"}}>
            <Heading>
              {tag.name.current}
            </Heading>
            <SimpleGrid columns={4} gap={8}>
              {tag.images && tag.images.map(image => (
                <Box key={image._id}>
                  <Image 
                    w="full"
                    h="250"
                    m="auto"
                    mb="3"
                    backgroundColor="#111" 
                    objectFit="scale-down" 
                    objectPosition="center" 
                    src={imageBuilder.image(image).height('250').fit('fill').url()} alt={image.description}
                  />
                  <Heading fontSize="md">{image.description ?? ''}</Heading>
                  <List listStyleType="none">
                    <ListItem fontSize="sm">{image.altText?? ''}</ListItem>
                    <ListItem fontSize="xs"><i>{image.originalFilename ?? ''}</i></ListItem>
                    {image.source?.name && (
                      <ListItem fontSize="xs">Importert fra {image.source.name ?? 'Illustrasjon'}</ListItem>
                    )}
                    <ListItem fontSize="xs"><strong>{image.count} referanse(r)</strong></ListItem>
                  </List>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </Container>
    </>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getContactCopy(preview)
  return {
    props: {data, preview},
  }
}
