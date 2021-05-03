import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'actorWithType',
    title: 'Actør med type',
    schemaType: 'Actor',
    parameters: [
      {
        name: 'roleName',
        title: 'Role name',
        type: 'string'
      }
    ],
    value: parameters => ({
      role: parameters.roleName
    })
  }) 
]