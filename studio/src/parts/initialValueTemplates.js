import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'actorWithType',
    title: 'Aktør med type',
    schemaType: 'Actor',
    parameters: [{name: 'actorTypeId', type: 'string'}],
    value: params => ({
      hasType: [{_type: 'reference', _ref: params.actorTypeId}]
    })
  }), 
  T.template({
    id: 'humanMadeObjectWithType',
    title: 'Object med type',
    schemaType: 'HumanMadeObject',
    parameters: [{name: 'objectTypeId', type: 'string'}],
    value: params => ({
      hasType: [{_type: 'reference', _ref: params.objectTypeId}]
    })
  }) 
]