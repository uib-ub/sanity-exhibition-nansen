import React from 'react';
import _ from 'lodash';
import { Card, Container, Code, Heading, Stack, Text } from '@sanity/ui';
import { getFields, getContext, orderSchemas } from '../lib';

const Context = ({ types }) => {
  const orderedClasses = orderSchemas(types)
  let {context, base} = getContext()

  orderedClasses
    .forEach((type) => {
      context['@context'][type.name] = {
        '@id': `${base}${type.name}`,
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
          <Text as="p">Starting point for a JSON-LD Context...</Text>
        </Stack>
        <Card marginTop={6}>
          <Code language="json" size={1}>
            {JSON.stringify(context, null, 2)}
          </Code>
        </Card>
      </Card>
    </Container>
  );
};

export default Context;
