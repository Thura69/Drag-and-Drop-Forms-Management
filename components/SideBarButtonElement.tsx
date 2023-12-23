import React from 'react'
import { FormElement } from './FromElements'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

export const SideBarButtonElement = (
    {
        formElements
    }: {
        formElements:FormElement
    }
) => {
    const { label, icon: Icon } = formElements.designerBtnElement;
    
    const draggble = useDraggable({
        id: `designer-btn${formElements.type}`,
        data: {
            type: formElements.type,
            isDesignerBtnElement:true
        }
    })

  return (
    <Button
    ref={draggble.setNodeRef}
    variant={'outline'} 
    className={cn('flex flex-col w-[120px] h-[120px]  gap-2 cursor-grab',draggble.isDragging && ' ring-2 ring-primary')}
    {...draggble.listeners}
    {...draggble.attributes}
    >
          <Icon className="h-8 w-8  cursor-grab"/>
          <p className=' text-xs'>{label}</p>
    </Button>
  )
}

export const SideBarButtonElementDragOverlay = (
    {
        formElements
    }: {
        formElements:FormElement
    }
) => {
    const { label, icon: Icon } = formElements.designerBtnElement;

  return (
    <Button
    variant={'outline'} 
    className={'flex flex-col w-[120px] h-[120px]  gap-2 cursor-grab'}
    >
    <Icon className="h-8 w-8  cursor-grab"/>
    <p className=' text-xs'>{label}</p>
    </Button>
  )
}
