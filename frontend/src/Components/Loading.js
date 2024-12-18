import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
  <Spinner animation="border" role="status">
    <span>Loading...</span>
  </Spinner>
  )
}

export default Loading