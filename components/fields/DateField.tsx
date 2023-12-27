'use client'
import React, { ElementType, useEffect, useState } from 'react'
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from '../FromElements'
import { BsFillCalendar2Fill } from 'react-icons/bs';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDesigner } from '../hooks/useDesigner';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Calendar } from '../ui/calendar';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Popover } from '../ui/popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import format from 'date-fns/format';

const type: ElementsType = 'DateField';

const extraAttribute = {
    label: "Date Field",
    helperText: "Pick a date",
    require: false,
};

const propertiesFormSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(100),
    require: z.boolean().default(false),
})

type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
}

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttribute,
    }),
    designerBtnElement: {
        icon: BsFillCalendar2Fill,
        label: "Date Field"
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate:()=>true
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
    const [date, setDate] = useState<Date|undefined>( defaultValue ? new Date(defaultValue): undefined);
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
    <Popover>
        <PopoverTrigger asChild>
             <Button variant={'outline'} className={cn("w-full justify-center text-left font-normal",!date && " text-muted", error && 'border-red-500') }>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {
                date?format(date,"PPP"): <span>Pick a date</span>
            }
           
        </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto border bg-background p-0' align='start'>
            <Calendar
            mode='single'
            selected={date}
            onSelect={date => {
                setDate(date);
                if (!submitValue) return
                    const value = date?.toUTCString() || "";
                    const valid = DateFieldFormElement.validate(element, value);
                    setError(!valid);
                    submitValue(element.id, value);

            }}
            initialFocus
            />
        </PopoverContent>
    </Popover>
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
        <Button variant={'outline'} className='w-full justify-start text-left font-normal'>
            <CalendarIcon className='mr-2 h-4 w-4' />
            <span>Pick a date</span>
        </Button>
        {
            helperText && (
                <p className=' text-muted-foreground'>{helperText}</p>
            )
        }
    </div>   
}


