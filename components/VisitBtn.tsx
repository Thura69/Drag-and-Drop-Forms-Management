'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

export const VisitBtn = ({shareUrl}:{shareUrl:string}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const shareLink =  `${window.location.origin}/submit/${shareUrl}`;
  
    if (!mounted) {
      return null 
  }
  return (
      <Button className='w-[200px]' onClick={() => {
          window.open(shareLink,"_blank")
    }}>VisitBtn</Button>
  )
}
