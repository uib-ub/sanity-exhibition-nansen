import React from 'react';
import _ from 'lodash';
import config from 'config:jsonld-context';
import { Card, Container, Code, Heading, Stack, Text } from '@sanity/ui';

const Context = ({ types }) => {
  const orderedClasses = _.orderBy(types, ['name'], ['asc']).filter(
    (s) => !s.name.includes('locale') && !s.name.includes('block')
  );

  const base = config.prefix ? config.prefix : 'base';
  const uri = config.uri ? config.uri : 'http://example.org/model/0.1/';

  let context = {
    '@context': {
      '@version': 0.1,
      _id: '@id',
      _type: '@type',
      [base]: uri,
    },
  };

  const getProps = (prop) => {
    let result = { '@id': `${base}:${prop.name}` };
    if (prop.type === 'array') {
      result['@container'] = '@list';
    }
    if (prop.of && prop.of.some((i) => i.type === 'reference')) {
      result['@type'] = '@id';
    }
    if (prop.type === 'reference') {
      result['@type'] = '@id';
    }
    return result;
  };

  const getFields = (fields) => {
    console.log(fields);
    if (!fields) return null;

    const result = fields.map((field) => {
      return {
        [field.name]: getProps(field),
      };
    });
    return Object.assign(...result);
  };

  orderedClasses.forEach((type) => {
    context['@context'][type.name] = {
      '@id': `${base}:${type.name}`,
      '@context': getFields(type.fields),
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
