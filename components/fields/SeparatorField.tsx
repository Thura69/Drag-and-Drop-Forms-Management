'use client'
import React, { ElementType, useEffect, useState } from 'react'
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from '../FromElements'
import { MdTextFields } from 'react-icons/md';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '../hooks/useDesigner';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import {RiSeparator} from 'react-icons/ri'
import { Separator } from '../ui/separator';

const type: ElementsType = 'SeparatorField';

export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
   validate: (): boolean => true,
};







function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
}) {
 
    return <Separator/>
}
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <p>No properties for this element</p>
 }

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

     
    return <div className='flex flex-col w-full rounded-lg gap-2 items-start'>
        <Label className=' text-muted-foreground'>
         Separator Field
        </Label>
        <Separator/>
    </div>   
}


