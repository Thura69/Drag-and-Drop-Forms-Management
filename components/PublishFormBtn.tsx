import React, { startTransition, useState, useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublic } from 'react-icons/md'
import { AlertDialog, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { FaIcons } from 'react-icons/fa'
import { toast } from './ui/use-toast'
import { PublishForm } from '@/actions/form'
import { useRouter } from 'next/navigation'

function PublishFormBtn({id}:{id:number}) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publicForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description:"Your form is now avaliable to the public"
      })
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description:'Something went wrong!'
      })
    }
  }

  return (
   <AlertDialog >
     <AlertDialogTrigger asChild>
       <Button className='gap-2'>
        <MdOutlinePublic/>
        Publish
       </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone. After publishing you will not be able to edit this from. <br /><br />
        <span className=' font-medium'>By publishing this form you will make it avalible to the public and you will be able to collect submissions.</span>
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault();
            startTransition(publicForm)
          }}> {
          loading && <FaIcons className=" text-white animate-spin"/>
            }
          {
            !loading && "Proceed"
          }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
   </AlertDialog>
  )
}

export default PublishFormBtn