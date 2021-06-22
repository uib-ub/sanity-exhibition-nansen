import React from 'react'
import Date from './Date'

export default {
  title: 'Date',
  component: Date,
  argTypes: {
    children: {
      control: {
        type: 'date',
      }
    }
  }
}

const Template = (args) => <Date>{args.children}</Date>

export const Default = Template.bind({})
Default.args = {
  children: '1912-05-18T00:00:00.000Z',
}