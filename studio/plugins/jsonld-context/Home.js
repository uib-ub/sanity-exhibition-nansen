import React from 'react';
import _ from 'lodash';
import { Card, Container, Heading, Stack, Text } from '@sanity/ui';
import { getFields, getContext, getOntolgy, orderSchemas } from './lib';
import Context from './components/Context';
import Ontology from './components/Ontology';

const Home = ({ types }) => {
  const orderedClasses = orderSchemas(types)
  let {context, base} = getContext()

  const ontology = getOntolgy(orderedClasses)

  orderedClasses
    .forEach((type) => {
      context['@context'][type.name] = {
        '@id': type.options?.jsonld?.context?.['@id'] ? type.options.jsonld.context?.['@id'] : `${base}${type.name}`,
        '@context': getFields(type.fields, base),
      };
    });

  return (
    
    <Container width={2} padding={4}>
    <Card width={3} margin={3} padding={4}>
      <Stack space={3}>
        <Heading as="h1" size={5}>
          JSON-LD Context
        </Heading>
      </Stack>
      <Context context={context} />
    </Card>

    <Card width={3} margin={3} padding={4}>
      <Stack space={3}>
        <Heading as="h1" size={5}>
          JSON-LD Ontology
        </Heading>
      </Stack>
      <Ontology ontology={ontology} />
    </Card>
  </Container>
  );
};

export default Home;
