"use client"

import React, { ElementType, useState } from 'react'
import DesignerSideBar from './DesignerSideBar'
import {DragEndEvent, useDndMonitor, useDraggable, useDroppable} from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { ElementsType, FormElement, FormElementInstance, FormElements } from './FromElements';
import { useDesigner } from './hooks/useDesigner';
import { IdGenerator } from '@/lib/IdGenearator';
import { Button } from './ui/button';
import { BiSolidTrash } from 'react-icons/bi';
function Designer() {
  const {elements, addElements,selectedElement,setSelectedElement,removeElements} = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event:DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea = over?.data.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          IdGenerator()
        );

        addElements(elements.length, newElement);
        return
      }      

      const isDroppingOverDesignerElementTopHalf = over?.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBttomHalf = over?.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBttomHalf;

      const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active?.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          IdGenerator()
        );

        const overId = over?.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("Element not found!");
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBttomHalf) {
          indexForNewElement = overElementIndex + 1;
        } 

        addElements(indexForNewElement, newElement);
        return;
      }

      //third scenario
      const isDraggingDesignerElement = active?.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active?.data?.current?.elementId;
        const overId = over.data?.current?.elementId;
         
        const activeElementIndex = elements.findIndex((el) => el.id === activeId);

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        };

        const activeElement = { ...elements[activeElementIndex] };
        removeElements(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBttomHalf) {
          indexForNewElement = overElementIndex + 1;
        } 

        addElements(indexForNewElement,activeElement)

      }



    }
  })

  return (
    <div ref={droppable.setNodeRef} className='flex w-full h-full'>
          <div className='p-4 w-full '>
              <div className={cn(' bg-background w-full max-w-[1000px] m-auto  h-full flex flex-col items-center justify-start rounded-xl flex-grow flex-1  overflow-y-auto',droppable.isOver && 'ring-2 ring-primary/50')}>
          {
            !droppable.isOver && elements.length=== 0 && (<p className=' text-3xl text-muted-foreground font-bold flex flex-grow items-center justify-center'>Drop Here</p>)
          }
          {
            droppable.isOver && elements.length === 0 &&  (
              <div className='w-full p-4'>
                <div className='h-[120px] rounded-md bg-primary/20'></div>
              </div>
            )
          }
          {
            elements.length > 0 && (
              <div className="flex flex-col gap-2 p-4  w-full">{
                elements.map(element => ( 
                  <DesignerElementWrapper key={element.id} element={element} />
                ))
              }</div>
            )
          }
              </div>
          </div>
          <DesignerSideBar/>
    </div>
  )
};


function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const {removeElements,selectedElement,setSelectedElement} = useDesigner();
  const [isMouseOver, setIsMouseOver] = useState(false);



  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement:true
    }
  })

  const draggle = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement:true
    }
  })

  
  
  if (draggle.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;



  return <div
  ref={draggle.setNodeRef}
  {...draggle.listeners}
  {...draggle.attributes}
   className={`relative h-[120px] z-[10] felx flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset `}
  onMouseEnter={()=>setIsMouseOver(true)}
  onMouseLeave={()=>setIsMouseOver(false)}
  onClick={(e) => {
      e.stopPropagation();
    if (!draggle.isDragging) {
      setSelectedElement(element);
    }
    }}
  
  
  >
  <div ref={topHalf.setNodeRef} className={'absolute w-full h-1/2'}></div>
  <div ref={bottomHalf.setNodeRef} className='absolute  bottom-0  w-full h-1/2'></div>
  {
      isMouseOver && (
        <>
        <div className=' duration-500 z-20  absolute right-0 h-full'>
        <Button 
        variant={'outline'} 
        className='flex items-center justify-center z-[99] h-full bg-red-500 hover:bg-red-300 rounded-md rounded-l-none'
        onClick={(e)=>{
          e.stopPropagation();
          removeElements(element.id)
        }}
        >
        <BiSolidTrash className="h-6 w-6"/>  
        </Button>          
        </div>
         <div className=' absolute top-1/2 left-1/2 animate-pulse -translate-x-1/2 -translate-y-1/2'>
          <p className=' text-muted-foreground'>Click for properties or drag for move!</p>
        </div>
        </>
    )
  }
  {
    topHalf.isOver && <div className=' w-full absolute top-0 border-foreground rounded-t-md  border-t-4'></div>
  }
  <div className={cn('flex w-full h-[120px] px-4 py-2 items-center rounded-md bg-accent/40 pointer-events-none',isMouseOver && ' opacity-30')}>
    <DesignerElement elementInstance={element}/>
    </div>
    {
    bottomHalf.isOver && <div className=' w-full absolute bottom-0 border-foreground rounded-b-md  border-t-4'></div>
  }
  </div>
};

export default Designer