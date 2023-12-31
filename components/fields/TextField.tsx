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

const type: ElementsType = 'TextField';

const extraAttribute = {
    label: "Text Field",
    helperText: "Helper Text",
    require: false,
    placeHolder: "value here...."
};

const propertiesFormSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(100),
    require: z.boolean().default(false),
    placeHolder:z.string().max(50)
})

type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
}

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
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
   validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomeInstance;
    if (element.extraAttribute.require) {
      return currentValue.length > 0;
    }

    return true;
  },
};




type propertiesFormSchemaType = z.infer<typeof propertiesFormSchema>;


function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomeInstance;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttribute;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        className={cn(error && "border-red-500")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
    </div>
  );
}
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
      console.log("values",values)
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
          render={({ field })  => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The helper text of the field. <br />
                  It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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


