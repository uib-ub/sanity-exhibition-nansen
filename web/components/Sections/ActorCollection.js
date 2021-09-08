import React from 'react'
import { kebabCase } from 'lodash'
import { Heading, Image, Text } from '@chakra-ui/react'
import { imageBuilder } from '../../lib/sanity'
import PortableTextBlock from '../PortableTextBlock'

export default function ActorCollection(props) {
  return (
    <React.Fragment key={props._id}>
      <Heading maxW={['xl', null, 'xl', null]} mx="auto" fontSize={['xl', '2xl', '3xl', '3xl']}>
        {props.title}
      </Heading>

      <PortableTextBlock blocks={props.description} />

      {props?.items?.map((item) => (
        <React.Fragment key={item._id}>
          {item.image && (
            <Image
              mb="5"
              src={imageBuilder.image(item.image).height(800).url()}
              alt={item.label || 'No label'}
            />
          )}

          <Heading
            id={kebabCase(item.label)}
            as="h3"
            maxW={['xl', null, 'xl', null]}
            mx="auto"
            fontSize={['xl', '2xl', '3xl', null]}
          >
            {item.label}
          </Heading>

          {item.item?.shortDescription && (
            <Text maxW={['xl', null, 'xl', null]} mx="auto">
              {item.item.shortDescription}
            </Text>
          )}
          <PortableTextBlock blocks={item.description} />
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}
