import React from 'react'
import PropTypes from 'prop-types'
import * as ObjectComponents from './ActivityStreamObjects'
import { Alert, AlertIcon, AlertDescription, AlertTitle, Code } from '@chakra-ui/react'

function resolveSections(section) {
  const Section = ObjectComponents[section._type]

  if (Section) {
    return Section
  }

  console.error('Cant find section', section) // eslint-disable-line no-console
  return null
}

function RenderActivityStreamObject(props) {
  const {sections} = props

  const filteredSections = sections.filter((x) => x._type)

  if (!filteredSections) {
    console.error('Missing section')
    return <div>Missing sections</div>
  }

  return (
    <>
      {filteredSections.map((section) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Missing section!</AlertTitle>
              <AlertDescription>Add new section called <Code>{section._type}</Code>.</AlertDescription>
            </Alert>
          )
        }
        return <SectionComponent {...section} key={section._key} />
      })}
    </>
  )
}

RenderActivityStreamObject.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    }),
  ),
}

export default RenderActivityStreamObject
