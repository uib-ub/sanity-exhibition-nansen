import React from 'react';
import schema from 'part:@sanity/base/schema';
import Context from './components/Context';

// eslint-disable-next-line no-underscore-dangle
const { types } = schema._source;

const boundContext = <Context types={types} />;

export default {
  title: 'LD Context',
  name: 'jsonld-context',
  component: () => boundContext,
};
