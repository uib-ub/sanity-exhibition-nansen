import { Box, Heading, Image, Text } from '@chakra-ui/react'
import PortableTextBlock from '../../PT/PortableTextBlock'
import { kebabCase } from 'lodash'
import Link from '../../Link'
import { imageBuilder } from '../../../lib/sanity'
import Date from '../../Date'
// import Image from 'next/image'
// import { getNextSanityImage } from '../../../lib/sanity.server'

export default function ActorCollectionCard({ data }) {
  return (
    <>
      {data.map((card) => (
        <Box maxW="xs" key={card.item._id} m="4">
          {card.image && (
            <Box mb="3">
              <Image
                mx="auto"
                borderRadius="50%"
                alt={card.label || 'No label'}
                //{...getNextSanityImage(item.image)}
                src={imageBuilder.image(card.image).width('200').height('250').fit('fill').url()}
                objectFit="contain"
              />
            </Box>
          )}

          <Box px="3" textAlign="center">
            <Heading
              id={kebabCase(card.label)}
              as="h3"
              maxW={['xl', null, 'xl', null]}
              mx="auto"
              fontSize={['xl', '2xl', '3xl', null]}
            >
              <Link href={`/id/${card.item._id}`}>{card.label}</Link>
            </Heading>

            <Text fontSize={['sm', 'lg', null, null]} my="0">
              {card.item?.birth?.timespan[0] ? (
                <Date dateFormat="yyyy">
                  {card.item.birth?.timespan[0].date ??
                    card.item.birth?.timespan[0].beginOfTheBegin}
                </Date>
              ) : (
                '    '
              )}

              {(card.item?.birth?.timespan[0] || card.item?.death?.timespan[0]) && (
                <span>{' – '}</span>
              )}

              {card.item?.death?.timespan[0] ? (
                <Date dateFormat="yyyy">
                  {card.item.death?.timespan[0].date ?? card.item.death?.timespan[0].endOfTheEnd}
                </Date>
              ) : (
                '    '
              )}
            </Text>

            {card.item?.shortDescription && (
              <Text maxW={['xl', null, 'xl', null]} fontSize={['sm', 'lg', null, null]} mx="auto">
                {card.item.shortDescription}
              </Text>
            )}
            <PortableTextBlock fontSize={['sm', 'lg', null, null]} blocks={card.description} />
          </Box>
        </Box>
      ))}
    </>
  )
}
