

import { GetFormById } from '@/actions/form';
import Designer from '@/components/Designer';
import FormBuilder from '@/components/FormBuilder';
import PreviewDialogBtn from '@/components/PreviewDialogBtn';
import PublishFormBtn from '@/components/PublishFormBtn';
import SaveFormBtn from '@/components/SaveFormBtn';
import { DndContext } from '@dnd-kit/core';
import React from 'react'

async function PageBuilder({ params }: { params: { id: string } }) {

    console.log(params)

    const form = await GetFormById(Number(params.id));
    if (!form) {
        throw new Error("Form not found!");
    }
  return (
     <FormBuilder form={form}/>
  )
}

export default PageBuilder