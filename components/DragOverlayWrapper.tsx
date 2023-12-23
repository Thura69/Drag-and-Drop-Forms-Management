import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType, FormElements } from './FromElements';
import { SideBarButtonElement, SideBarButtonElementDragOverlay } from './SideBarButtonElement';
import { useDesigner } from './hooks/useDesigner';

export const DragOverlayWrapper = () => {
    const { elements } = useDesigner();
    const [draggedItem, setDraggedItem] = useState<Active|null>();

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        }
    });

    if (!draggedItem) return null;
    let node = <div className=' text-foreground'>Dragging</div>

    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
    if (isSidebarBtnElement) {
        const type = draggedItem?.data?.current?.type as ElementsType;
        node = <SideBarButtonElementDragOverlay formElements={FormElements[type]}/>
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement) {
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((el) => el.id === elementId);
        if (!element) node = <div>Element not found!</div>
        else {
            const DesignerElementComponent = FormElements[element.type].designerComponent

            node = <div className='flex w-full h-[120px] px-4 py-2 items-center rounded-md bg-accent pointer-events-none opacity-60'> <DesignerElementComponent elementInstance={element}/></div>
        }
    }

   

  return (
      <DragOverlay>{node}</DragOverlay>
  )
}
