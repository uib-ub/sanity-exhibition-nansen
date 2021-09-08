import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowCircleDown } from 'react-icons/fa'

const FootnoteRenderer = props => (
  <span>
    {props.children} <FaArrowCircleDown />
  </span>
)

FootnoteRenderer.propTypes = {
  children: PropTypes.node.isRequired
}

export default FootnoteRenderer