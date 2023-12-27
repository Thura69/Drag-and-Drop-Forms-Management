import React from 'react'
import { SideBarButtonElement } from './SideBarButtonElement'
import { FormElements } from './FromElements'
import { Separator } from './ui/separator'

export const FormElementsSideBar = () => {
  return (
    <div>
           <p className=' text-sm text-foreground'>Drag and drop elements</p>
           <Separator className='my-2'/>
           <div className=' grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
            <p className=' text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>Layout Elements</p>
            <SideBarButtonElement formElements={FormElements.SubTitleField} />
            <SideBarButtonElement formElements={FormElements.TitleField} />
            <SideBarButtonElement formElements={FormElements.ParagraphField} />
            <SideBarButtonElement formElements={FormElements.SeparatorField} />
            <SideBarButtonElement formElements={FormElements.SpacerField} />
            <p className=' text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>Form Elements</p>
             <SideBarButtonElement formElements={FormElements.TextField} />
             <SideBarButtonElement formElements={FormElements.NumberField} />
             <SideBarButtonElement formElements={FormElements.TextAreaField} />
             <SideBarButtonElement formElements={FormElements.DateField} />
             <SideBarButtonElement formElements={FormElements.SelectField} />
            
           </div>
    </div>
  )
} 
