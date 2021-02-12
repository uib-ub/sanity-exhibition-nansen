export default {
  widgets: [
    {
      name: 'structure-menu',
      layout: {width: 'medium'},
    },
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['madeObject'],
      },
      layout: {width: 'small'},
    },
    {
      name: 'muna-docs-widget',
      layout: {width: 'small'},
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6026485110cae59250d4a2fa',
                  title: 'Sanity Studio',
                  name: 'sanity-exhibition-nansen-studio',
                  apiId: 'be60672c-8e35-4f88-a947-eb80b4036d55',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/tarjelavik/sanity-exhibition-nansen',
            category: 'Code',
          },
        ],
      },
    },
  ],
}
