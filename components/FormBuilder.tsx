"use client"

import { Form } from '@prisma/client'
import React from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'
import Designer from './Designer'
import { DndContext } from '@dnd-kit/core'
import { DragOverlayWrapper } from './DragOverlayWrapper'


function FormBuilder({form}:{form:Form}) {
  return (
     <DndContext>
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
                    <><SaveFormBtn></SaveFormBtn><PublishFormBtn /></>
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