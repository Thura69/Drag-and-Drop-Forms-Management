import React, { useEffect, useTransition } from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'
import { useDesigner } from './hooks/useDesigner';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';
import { UpdateFormContent } from '@/actions/form';
function SaveFormBtn({id}:{id:number}) {
  const { elements } = useDesigner();
  const [loading,startTransition] = useTransition();
  
  const updateFormContent = async ()=>{
    try {
      const jsonElement = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElement);
      toast({
        title: "Success",
        description:"Your form has been saved"
      })

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant:'destructive'
      })
    }
  };



  return (
    <Button variant={'outline'} disabled={loading} onClick={() => {
      startTransition(updateFormContent)
     }} className='gap-2'>
      <HiSaveAs className="h-4 w-4" />
      {
        loading && <FaSpinner/>
      }
          Save
    </Button>
  )
}

export default SaveFormBtn