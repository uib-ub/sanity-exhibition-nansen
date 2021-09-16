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
    <Container maxW={['xl', '2xl', '4xl', '6xl']} my="10">
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