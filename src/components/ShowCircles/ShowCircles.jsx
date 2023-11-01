import React from 'react'
import { Circles } from 'react-loader-spinner'

const ShowCircles = () => {
  return (
    <Circles
    height="20"
    width="20"
    color="#b10e2c"
    ariaLabel="circles-loading"
    wrapperStyle={{ bottom: '47%', left: '47%' }}
    wrapperClass=""
    visible={true}
  />
  )
}

export default ShowCircles