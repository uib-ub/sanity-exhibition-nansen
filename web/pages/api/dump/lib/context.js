export const context = {
  '@context': {
    'id': '@id',
    'type': '@type',
    '@base': 'http://data.muna.xyz/id/',
    '@vocab': 'http://muna.xyz/model/0.1/',
    'label': {
      '@id': 'http://www.w3.org/2000/01/rdf-schema#label',
      '@container': ['@language', '@set'],
    },
    'Production': {
      '@id': 'http://muna.xyz/model/0.1/Production'
    },
    'DataTransferEvent': {
      '@id': 'http://muna.xyz/model/0.1/DataTransferEvent'
    },
    'DigitalObject': {
      '@id': 'http://muna.xyz/model/0.1/DigitalObject'
    },
    'DigitalDevice': {
      '@id': 'http://muna.xyz/model/0.1/DigitalDevice'
    },
    'HumanMadeObject': {
      '@id': 'http://muna.xyz/model/0.1/HumanMadeObject'
    },
    'LinguisticObject': {
      '@id': 'http://muna.xyz/model/0.1/LinguisticObject'
    },
    'Identifier': {
      '@id': 'http://muna.xyz/model/0.1/Identifier'
    },
    'slug': {
      '@id': 'http://muna.xyz/model/0.1/Slug'
    },
  },
}
