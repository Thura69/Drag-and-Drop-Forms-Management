"use client"

import { Form } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'
import Designer from './Designer'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { DragOverlayWrapper } from './DragOverlayWrapper'
import { useDesigner } from './hooks/useDesigner'
import { ImSpinner2 } from 'react-icons/im'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'
import Link from 'next/link'
import { BiSolidArrowToLeft, BiSolidArrowToRight } from 'react-icons/bi'
import Confittie from 'react-confetti'

function FormBuilder({ form }: { form: Form }) {

  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance:5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor);
  
  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setIsReady(true);
    const readyTimeOut = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeOut);

  }, [form, setElements,isReady]);

  if (!isReady) {
    <div className=' h-full flex flex-col items-center justify-center w-full'>
    <ImSpinner2 className=" animate-spin h-12 w-12"/>
    </div>
  }
  
  const ShareURL = `${window.location.origin}/submit/${form.shareURL}`;

  if (form.published) {
    return (
      <>
        <Confittie
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
        <div className='flex flex-col items-center  justify-center h-full w-full'>
          <div className=' max-w-md'>
            <h1 className='text-center text-4xl font-bold text-primary border-b pb-2 mb-10'>
              🎊🎊 Form Publish 🎊🎊
            </h1>
            <h2 className='text-2xl'>Share this form </h2>
            <h3 className='text-xl text-muted-foreground border-b pb-10'>Anyone with this link can view and submit the form</h3>
            <div className='my-4 flex flex-col gap-2 items-center w-full border-b pb-4'>
              <Input className='w-full ' readOnly value={ShareURL}></Input>
              <Button className="mt-2 w-full" onClick={() => {
                navigator.clipboard.writeText(ShareURL);
                toast({
                  title: 'Copied!',
                  description:'Link copied to clipboard'
                })
              }}>Copy Link</Button>
            </div>
            <div className='flex  justify-between'>
              <Button asChild variant={'link'}>
                <Link href={'/'} className='gap-2'>
                  <BiSolidArrowToLeft />
                  Go back home
                </Link>
              </Button>
              <Button asChild variant={'link'}>
                <Link href={`/froms/${form.id}`} className='gap-2'>
                  Form details
                  <BiSolidArrowToRight />
                </Link>
              </Button>
            </div>
          </div>
      </div>
      </>
   )
 }

  return (
     <DndContext sensors={sensors}>
         <main className='flex flex-col w-full h-full'>
            <nav className=' flex justify-between items-center gap-4 border-b-2 p-4'>
              <h2 className=' truncate font-medium'>
                <span className=' text-muted-foreground mr-2'>Form:</span>
                <span>{form.name}</span>
              </h2>
              <div className='flex items-center gap-2'>
                <PreviewDialogBtn/>
                {
                  !form.published && (
                <>
                  <SaveFormBtn id={form.id}></SaveFormBtn>
                  <PublishFormBtn id={form.id} />
                </>
                  )
          }
              </div>
            </nav>
            <div className='flex bg-[url(/paper.svg)] dark:bg-[url(/paper_dark.svg)] overflow-y-auto flex-grow items-center justify-center w-full relative bg-accent'>
              <Designer/>
            </div>
          </main>
             <DragOverlayWrapper/> 
       
     </DndContext>
  )
}

export default FormBuilder