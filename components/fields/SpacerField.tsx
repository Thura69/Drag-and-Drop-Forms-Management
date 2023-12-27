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
import { LuHeading1, LuHeading2,LuSeparatorHorizontal } from 'react-icons/lu';
import { Slider } from '../ui/slider';

const type: ElementsType = 'SpacerField';

const extraAttribute = {
    height: 20,
};

const propertiesFormSchema = z.object({
    height: z.number().min(2).max(200),
})

type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
}

export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttribute,
    }),
    designerBtnElement: {
        icon: LuSeparatorHorizontal,
        label: "Separator Field"
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
    const { height } = element.extraAttribute;
 
    return <div style={{height,width:'100%'}}></div>
}
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const {updateElements} = useDesigner();
    const element = elementInstance as CustomeInstance;

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesFormSchema),
        mode: 'onBlur',
        defaultValues: {
            height: element.extraAttribute.height,
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
            name="height"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Height (px):{form.watch('height')}</FormLabel>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                        <Slider
                            defaultValue={[Number(field.value)]}
                            min={5}
                            max={200}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}

                        />
                    </FormControl>
                </FormItem>
            )}
            ></FormField>
        </form>
    </Form>
 }

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {

    const element = elementInstance as CustomeInstance;

    const {height} = element.extraAttribute;
     
    return <div className='flex flex-col w-full rounded-lg gap-2 items-center'>
        <Label className=' text-muted-foreground'>
         Spacer Field : {height}px 
        </Label>
        <LuSeparatorHorizontal className="w-8 h-8"/>

    </div>   
}


