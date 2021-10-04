import Image from 'next/image'
import Link from '../../components/Link'
import { getContactCopy } from '../../lib/api'
import Head from 'next/head'
import { Box, Container, Heading, SimpleGrid, List, ListItem } from '@chakra-ui/react'
import { getNextSanityImage } from '../../lib/sanity.server'

export default function ContactCopy({ data }) {
  const { tags, siteSettings } = data
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
          borderColor="gray.300"
          fontSize={['2xl', '3xl', '4xl', '5xl']}
        >
          <Link href="/">
            Kontaktkopi for <strong>{siteSettings.title}</strong>
          </Link>
        </Heading>

        {tags &&
          tags.map((tag) => (
            <Box key={tag._id} sx={{ pageBreakAfter: 'always' }}>
              <Heading>{tag.name.current}</Heading>
              <SimpleGrid columns={4} gap={8}>
                {tag.images &&
                  tag.images.map((image) => (
                    <Box key={image._id}>
                      <Image alt="" {...getNextSanityImage(image)} layout="responsive" />
                      <Heading fontSize="md">{image.description ?? ''}</Heading>
                      <List listStyleType="none">
                        <ListItem fontSize="sm">{image.altText ?? ''}</ListItem>
                        <ListItem fontSize="xs">
                          <i>{image.originalFilename ?? ''}</i>
                        </ListItem>
                        {image.source?.name && (
                          <ListItem fontSize="xs">
                            Importert fra {image.source.name ?? 'Illustrasjon'}
                          </ListItem>
                        )}
                        <ListItem fontSize="xs">
                          <strong>{image.isThumbnail ? 'Brukt som objekt thumbnail' : ''}</strong>
                        </ListItem>
                        <ListItem fontSize="xs">
                          <strong>
                            {image.countAssetUsage > 0
                              ? `Brukt som ill. ${image.countAssetUsage} gang(er)`
                              : 'Ikke benyttet som ill. i nettutstilling'}
                          </strong>
                        </ListItem>
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

export async function getStaticProps({ preview = false }) {
  const data = await getContactCopy(preview)
  return {
    props: { data, preview },
  }
}
