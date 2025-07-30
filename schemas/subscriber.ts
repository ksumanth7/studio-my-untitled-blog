// schemas/subscriber.ts
import {Rule} from 'sanity'

const subscriber = {
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
  ],
}

export default subscriber
