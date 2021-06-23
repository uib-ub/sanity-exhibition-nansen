import _ from 'lodash';
import config from 'config:jsonld-context';

/**
 * Order the schemas for simpler diffs
 */
export const orderSchemas = (schema) => {
  const orderedClasses = _.orderBy(schema, ['name'], ['asc']).filter(
    (s) => !s.name.includes('locale') && !s.name.includes('block')
  );
  return orderedClasses
}

/**
 * Create default context
 * @returns {object}
 */
export const getContext = () => {
  // If no vocab is set, default to example uri
  const vocab = config.vocab?.prefix ? config.vocab.prefix : '@vocab';
  const vocabUri = config.vocab?.uri ? config.vocab.uri : 'http://example.org/model/0.1/';
  
  // If vocab is set to '@vocab' then we do not add a prefix to '@id' values, because '@base' sets prefix for all
  const base = config.vocab?.prefix && config.vocab?.prefix != '@vocab' ? `${config.vocab.prefix}:` : ''
  
  // Default context
  const context = {
    '@context': {
      '@version': 0.1,
      _id: '@id',
      _type: '@type',
      [vocab]: vocabUri,
      '@base': config.base ? config.base : undefined
    },
  };

  return {context, base}
}


/**
 * Map props to '@id', '@container' and '@type'
 * @param {object} prop 
 * @returns {object}
 */
const getProps = (prop, base) => {
  let result = { '@id': `${base}${prop.name}` };
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

/**
 * Return fields as key with local '@context' object
 * @param {array} fields 
 * @returns {object}
 */
export const getFields = (fields, base) => {
  console.log(fields);
  if (!fields) return null;

  const result = fields.map((field) => {
    return {
      [field.name]: getProps(field, base),
    };
  });
  return Object.assign(...result);
};