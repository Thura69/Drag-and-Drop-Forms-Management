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
import { LuHeading1 } from 'react-icons/lu';

const type: ElementsType = 'TitleField';

const extraAttribute = {
    title: "Title Field",
};

const propertiesFormSchema = z.object({
    title: z.string().min(2).max(50),
})

type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
}

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttribute,
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: "Title Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
   validate: (): boolean => true,
};




type propertiesFormSchemaType = z.infer<typeof propertiesFormSchema>;


function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
}) {
  const element = elementInstance as CustomeInstance;
    const { title } = element.extraAttribute;
 
    return <p>{title}</p>
}
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const {updateElements} = useDesigner();
    const element = elementInstance as CustomeInstance;

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesFormSchema),
        mode: 'onBlur',
        defaultValues: {
            title: element.extraAttribute.title,
        }
    });

    useEffect(() => {
        form.reset(element.extraAttribute);
    }, [element, form]);
    

    function applyChanges(values: propertiesFormSchemaType) {
        updateElements(element.id, {
            ...element,
            extraAttribute: {
               ...values 
           }
        })
    }

    return <Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} onChange={form.handleSubmit(applyChanges)} onSubmit={(e)=>{e.preventDefault()}} className=' space-y-3 '>
            <FormField
            control={form.control}
            name="title"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                        }} />
                    </FormControl>
                    <FormDescription>
                        The Title of the field. <br/> It will be displayed above the Title.
                    </FormDescription>
                </FormItem>
            )}
            ></FormField>
        </form>
    </Form>
 }

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

    const element = elementInstance as CustomeInstance;

    const {title} = element.extraAttribute;
     
    return <div className='flex flex-col w-full rounded-lg gap-2 items-start'>
        <Label className=' text-muted-foreground'>
         Title Field
        </Label>
        <p className='text-xl'>{title}</p>

    </div>   
}


