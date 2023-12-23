import React from 'react'
import { SideBarButtonElement } from './SideBarButtonElement'
import { FormElements } from './FromElements'

function DesignerSideBar() {
  return (
      <aside className=' w-[400px] max-w-[400px] flex flex-col flex-grow bg-background gap-2 border-l-2 border-muted p-4 overflow-y-auto  h-full'>
          <SideBarButtonElement formElements={FormElements.TextField} />
    </aside>
  )
}

export default DesignerSideBar