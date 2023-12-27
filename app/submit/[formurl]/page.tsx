import { GetFormContentByURL } from '@/actions/form';
import { FormSubmitComponent } from '@/components/FormSubmitComponent';
import { FormElementInstance } from '@/components/FromElements';
import React from 'react'

async function Page({ params }: {
  params: {
  formurl:string
  }
}) {
  
  const form = await GetFormContentByURL(params.formurl);

  if (!form) {
    throw new Error("form not found")
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formurl} content={formContent} />

}

export default Page