'use client'
import React, { ElementType, useEffect } from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FromElements'
import { FormComponent } from '../FormComponent';
import { MdTextFields } from 'react-icons/md';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '../hooks/useDesigner';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';

const type: ElementsType = 'TextField';

const extraAttribute = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "value here...."
};

const propertiesFormSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(100),
    require: z.boolean().default(false),
    placeHolder:z.string().max(50)
})

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttribute,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent: () => FormComponent(),
    propertiesComponent: PropertiesComponent
};


type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
}

type propertiesFormSchemaType = z.infer<typeof propertiesFormSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
    const {updateElements} = useDesigner();
    const element = elementInstance as CustomeInstance;

    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesFormSchema),
        mode: 'onBlur',
        defaultValues: {
            label: element.extraAttribute.label,
            helperText: element.extraAttribute.helperText,
            require: element.extraAttribute.required,
            placeHolder: element.extraAttribute.placeHolder
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
        <form onBlur={form.handleSubmit(applyChanges)} onSubmit={(e)=>{e.preventDefault()}} className=' space-y-3 '>
            <FormField
            control={form.control}
            name="label"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                        }} />
                    </FormControl>
                    <FormDescription>
                        The label of the field. <br/> It will be displayed above the field.
                    </FormDescription>
                </FormItem>
            )}
            ></FormField>
            <FormField
            control={form.control}
            name="placeHolder"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Place Holder</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                        }} />
                    </FormControl>
                    <FormDescription>
                       The placeholder of the filed.
                    </FormDescription>
                </FormItem>
            )}
            ></FormField>
            <FormField
            control={form.control}
            name="helperText"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Helper Text</FormLabel>
                    <FormControl>
                        <Input {...field} onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                        }} />
                    </FormControl>
                    <FormDescription>
                       The helper text of the filed.
                    </FormDescription>
                </FormItem>
            )}
            ></FormField>
            <FormField
            control={form.control}
            name="require"
            render={({field})=>(
                <FormItem className='flex  items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className=' space-y-0.5'>
                        <FormLabel>Required</FormLabel>
                    <FormDescription>
                       The helper text of the filed.
                    </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
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

    const {label,required,placeHolder,helperText} = element.extraAttribute;
     
    return <div className='flex flex-col w-full rounded-lg gap-2 items-start'>
        <Label className=' text-muted-foreground'>
            {label}
            {required}
        </Label>
        <Input readOnly disabled placeholder={placeHolder} />
        {
            helperText && (
                <p className=' text-muted-foreground'>{helperText}</p>
            )
        }
    </div>   
}


