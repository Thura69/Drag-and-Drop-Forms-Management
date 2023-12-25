import React from 'react'
import { SideBarButtonElement } from './SideBarButtonElement'
import { FormElements } from './FromElements'

export const FormElementsSideBar = () => {
  return (
    <div>
           <SideBarButtonElement formElements={FormElements.TextField} />
    </div>
  )
} 
