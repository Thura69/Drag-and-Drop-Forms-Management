import React from 'react'
import { ImSpinner } from 'react-icons/im'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'><ImSpinner className=" animate-spin"/></div>
  )
}

export default Loading