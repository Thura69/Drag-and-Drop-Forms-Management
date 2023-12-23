import React from 'react'
import { Button } from './ui/button'
import { MdOutlinePublic } from 'react-icons/md'


function PublishFormBtn() {
  return (
   <Button className='gap-2'>
    <MdOutlinePublic/>
    Publish
   </Button>
  )
}

export default PublishFormBtn