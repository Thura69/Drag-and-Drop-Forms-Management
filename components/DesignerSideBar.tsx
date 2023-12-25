import React from 'react'
import { SideBarButtonElement } from './SideBarButtonElement'
import { FormElements } from './FromElements'
import { useDesigner } from './hooks/useDesigner'
import { FormElementsSideBar } from './FormElementsSideBar';
import { PropertiesComponent } from './PropertiesComponent';
import { PropertiesComponentSideBar } from './PropertiesComponentSideBar';

function DesignerSideBar() {
  const {selectedElement} = useDesigner();
  return (
      <aside className=' w-[400px] max-w-[400px] flex flex-col flex-grow bg-background gap-2 border-l-2 border-muted p-4 overflow-y-auto  h-full'>
      {
        !selectedElement && <FormElementsSideBar/>
      }
      {
        selectedElement && <PropertiesComponentSideBar/>
      }
    </aside>
  )
}

export default DesignerSideBar