'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
    
} from './ui/dialog';

import { RxFilePlus } from "react-icons/rx";  
import { ImSpinner2 } from "react-icons/im";
import { Button } from './ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from './ui/form';
import * as z from 'zod';
import { min } from 'date-fns';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { formSchema, formSchemaType } from '@/schemas/form';
import { CreateForm } from '@/actions/form';




function CreateFormBtn() {

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })

  async  function onSubmit(values: formSchemaType) {
        try {
        const formId =    await CreateForm(values);
            toast({
                title: "Success",
                description: "Form created successfully"
            });
          
        } catch (error) {
          toast({
              title: "Error",
              description: "Something went worng, please try again latger",
              variant:"destructive"
          })
      }
    }

  return (
   <Dialog>
    <DialogTrigger asChild>
              <Button variant={'outline'} className='group  border border-primary/20 h-[190px] justify-center items-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background'>
              <RxFilePlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
              <p className=' text-muted-foreground text-lg font-md group-hover:text-primary'>Create New Form</p>    
              </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>
            Create Form
        </DialogTitle>
        <DialogDescription>
            Create a new form to start collection responses
        </DialogDescription>
    </DialogHeader>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField 
        control={form.control}
        name="name"
        render={({field}) => 
        <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage/>
        </FormItem>
        }
        ></FormField>
        <FormField 
        control={form.control}
        name="description"
        render={({field}) => 
        <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                <Textarea {...field} />
                </FormControl>
                <FormMessage/>
        </FormItem>
        }
        ></FormField>
        </form>
    </Form>
    <DialogFooter>
                  <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className='w-full mt-4'>
                      {!form.formState.isSubmitting && <span>Save</span>}
                      {form.formState.isSubmitting && <ImSpinner2 className=" animate-spin"/>}
                  </Button>
    </DialogFooter>
    </DialogContent>
   </Dialog>
  )
}

export default CreateFormBtn