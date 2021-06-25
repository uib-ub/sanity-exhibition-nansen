import _ from 'lodash';
import config from 'config:jsonld-context';

/**
 * Order the schemas for simpler diffs
 */
export const orderSchemas = (schema) => {
  const result = _.orderBy(schema, ['name'], ['asc']).filter(_class => _class.options?.jsonld?.exclude != true)
  return result
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
      '@version': 1.1,
      _id: '@id',
      _ref: '@id',
      id: '@id',
      _type: '@type',
      type: '@type',
      '@base': config.base ? config.base : undefined,
      [vocab]: vocabUri,
      "crm": "http://www.cidoc-crm.org/cidoc-crm/",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
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
  const result = {
    '@id': prop.options?.jsonld?.context?.['@id'] ? prop.options.jsonld.context?.['@id'] : `${base}${prop.name}`,
    '@container': prop.options?.jsonld?.context?.['@container'] ? prop.options.jsonld.context?.['@container'] : undefined,
    '@type': prop.options?.jsonld?.context?.['@type'] ? prop.options.jsonld.context?.['@type'] : prop.type === 'reference' ? `${base}${prop.name}` : undefined,
  };
  
/*   if (prop.type === 'reference') {
    result['@type'] = '@id';
  }

  if (prop.options?.jsonld?.context) {
    result = prop.options.jsonld.context
  }
  
  if (!prop.options?.jsonld?.context?.['@id']) {
    result['@id'] = `${base}${prop.name}`;
  } */
  
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
    if(field.options?.jsonld?.exclude) return

    return {
      [field.name]: getProps(field, base),
    };
  });
  return Object.assign(...result);
};