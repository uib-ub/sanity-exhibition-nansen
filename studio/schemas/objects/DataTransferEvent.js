export default {
  name: 'DataTransferEvent',
  type: 'object',
  title: 'Dataoverføringshendelse',
  titleEN: 'Data transfer event',
  fields: [
    {
      name: 'transferred',
      title: 'Transferred',
      type: 'DigitalObject',
      options: {
        jsonld: {
          context: {
            "@type": "@json"
          }
        }
      },
    },
    {
      name: 'hasSender',
      title: 'Has sender',
      type: 'DigitalDevice',
      options: {
        jsonld: {
          context: {
            "@type": "@json"
          }
        }
      },
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      options: {
        jsonld: {
          context: {
            "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
          }
        }
      },
    },
  ],
}
