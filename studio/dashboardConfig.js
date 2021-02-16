export default {
  widgets: [
    {
      name: 'structure-menu',
      layout: {
        width: 'medium'
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['HumanMadeObject'],
      },
      layout: {width: 'small'},
    },
    {
      name: 'muna-docs-widget',
      layout: {
        width: 'small'
      },
    },
    {
      name: 'project-users', 
      layout: {
        height: 'auto'
      }
    },
    {
      name: 'vercel',
      options: {
        deployLimit: 5,
        deployHook: process.env.SANITY_STUDIO_VERCEL_DEPLOY_HOOK, // optional
        forceSmallLayout: false, // optional
        projectId: process.env.SANITY_STUDIO_VERCEL_PROJECT_ID,
        // teamId: '%YOUR_PROJECT_ID%', // optional
        token: process.env.SANITY_STUDIO_VERCEL_TOKEN,
      },
      layout: {
        width: 'large',
      },
    },
    {
      name: 'project-info',
      options: {
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
