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
    },
    {
      name: 'hasSender',
      title: 'Has sender',
      type: 'DigitalDevice',
    },
    {
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    },
  ],
}
