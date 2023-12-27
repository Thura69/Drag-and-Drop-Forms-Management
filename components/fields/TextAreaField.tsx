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
import { BsTextarea } from 'react-icons/bs';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';

const type: ElementsType = 'TextAreaField';

const extraAttribute = {
    label: "Text Area",
    helperText: "Helper Text",
    require: false,
    placeHolder: "value here....",
    rows:3
};

const propertiesFormSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(100),
    require: z.boolean().default(false),
    placeHolder: z.string().max(50),
    rows:z.number().min(1).max(10)
})

type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
}

export const TextAreaFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttribute,
    }),
    designerBtnElement: {
        icon: BsTextarea,
        label: "Text Area"
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

    const { label, required, placeHolder, helperText, rows } = element.extraAttribute;
    
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        className={cn(error && "border-red-500")}
        rows={rows}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextAreaFormElement.validate(element, e.target.value);
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
            placeHolder: element.extraAttribute.placeHolder,
            rows:element.extraAttribute.rows
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
            name="rows"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Rows {form.watch('rows')}</FormLabel>
                    <FormControl>
                        <Slider defaultValue={[field.value]} min={1} max={10} step={1} onValueChange={(value) => {
                            field.onChange(value[0])
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

    const {label,required,placeHolder,helperText, rows} = element.extraAttribute;
     
    return <div className='flex flex-col  w-full  rounded-lg gap-2 items-start'>
        <Label className=' text-muted-foreground text-sm'>
            {label}
            {required}
        </Label>
        <Textarea  readOnly disabled placeholder={placeHolder} />
        {
            helperText && (
                <p className=' text-muted-foreground text-sm'>{helperText}</p>
            )
        }
    </div>   
}


