import {orderBy} from 'lodash'
import {getSiteSettings} from '../../lib/api'
import Layout from '../../components/Layout'
import {Badge, Container, Heading, Box, List, ListItem, useColorModeValue, SimpleGrid} from '@chakra-ui/react'
import Link from '../../components/Link'
import dynamic from 'next/dynamic'

const MiradorWithNoSSR = dynamic(() => import('../../components/MiradorViewer'), {ssr: false})

export default function Mirador({data, preview}) {
  const tagColor = useColorModeValue('blackAlpha', 'red')

  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container
        h="100vh"
        m="0" 
        p="0" 
        maxWidth="full"
      >
        <MiradorWithNoSSR 
          variant="catalog"
          workspaceControlPanel="true"
          catalog="http://localhost:3000/api/collection"
        />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getSiteSettings(preview)
  return {
    props: {data, preview},
  }
}
