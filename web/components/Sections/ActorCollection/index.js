import React from 'react'
import Profile from './Profile'
import Compact from './Compact'
import ActorCollectionCard from './Card'
import ActorCollectionCards from './Cards'
import { Container } from '@chakra-ui/react'

export default function ActorCollection(props) {
  if (!props || props.disabled === true) {
    return null
  }

  return (
    <Container maxW="95vw" my="10" p="0" bg="gray.300" centerContent>
      {/* <Heading maxW={['xl', null, 'xl', null]} mx="auto" fontSize={['xl', '2xl', '3xl', '3xl']}>
        {props.title}
      </Heading>

      <PortableTextBlock blocks={props.description} /> */}

      {props?.items && props?.view === 'profile' && <Profile data={props?.items} />}
      {props?.items && props?.view === 'compact' && <Compact data={props?.items} />}
      {props?.items && props?.view === 'card' && (
        <ActorCollectionCards>
          <ActorCollectionCard data={props?.items} />
        </ActorCollectionCards>
      )}
    </Container>
  )
}
