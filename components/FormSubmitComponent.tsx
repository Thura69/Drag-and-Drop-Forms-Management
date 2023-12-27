'use client'
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FromElements'
import { Button } from './ui/button'
import { HiCursorClick } from 'react-icons/hi'
import { toast } from './ui/use-toast'
import { ImSpinner } from 'react-icons/im'
import { SubmitForm } from '@/actions/form'

export const FormSubmitComponent = (
    { formUrl, content }: {
        formUrl: string,
        content:FormElementInstance[]
    }
) => {

    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});
    const [renderKey, setRenderKey] = useState(new Date().getDate());
    
    const [pending, startTransition] = useTransition();
    const [submitted, setSubmitted] = useState(false);

     const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

    const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);
    
    
    
    const submitForm = async () => {
        formErrors.current = {};
        const validation = validateForm();
        if (!validation) {
            setRenderKey(new Date().getTime())
            toast({
                title: "Error",
                description: "Please check the form for errors",
                variant:'destructive'
            })
            return
        }
        try {
            const JsonContent = JSON.stringify(formValues.current);
            await SubmitForm(formUrl, JsonContent);
            setSubmitted(true);
        } catch (error) {
            toast({
                title: "error",
                description: 'Something Went wrong',
                variant:'destructive'
           })
       }
    };


     if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">Thank you for submitting the form, you can close this page now.</p>
        </div>
      </div>
    );
  }
    
  return (
    <div className='flex justify-center w-full min-h-[90svh]  h-full items-center p-8 '>
          <div key={renderKey} className='max-w-[620px] flex flex-col gap-4  flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700'>
               {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
              <Button
                  className='mt-8 w-full'
                  onClick={() => { 
                      startTransition(submitForm)
                   }}
                  disabled={pending}
              >
                  {
                      !pending && <>
                       <HiCursorClick className="h-4 w-4 mr-2"/>  
                  Submit</>
                  }
                  {
                      pending && <ImSpinner className=" animate-spin h-4 w-4"/>
                  }
              </Button>
        </div>
    </div>
  )
}
