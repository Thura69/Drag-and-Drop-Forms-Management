'use client'
import React, { ElementType } from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FromElements'
import { FormComponent } from '../FormComponent';
import { PropertiesComponent } from '../PropertiesComponent';
import { MdTextFields } from 'react-icons/md';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';

const type: ElementsType = 'TextField';

const extraAttribute = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "value here...."
};

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
    propertiesComponent: () => PropertiesComponent()
};


type CustomeInstance = FormElementInstance & {
    extraAttribute: typeof extraAttribute
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