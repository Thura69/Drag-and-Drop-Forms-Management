"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

function Error({ error }: { error: Error }) {
    console.error(error);
  return (
      <div className='w-full h-full flex flex-col justify-center gap-4 items-center'>
          <h2 className=' text-destructive text-4xl'>Something went wrong!</h2>
          <Button asChild>
              <Link href={'/'} >
                  Go back to home
              </Link>
          </Button>
    </div>
  )
}

export default Error