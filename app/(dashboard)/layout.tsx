import Logo from '@/components/Logo'
import ThemeSwicher from '@/components/ThemeSwicher'
import { UserButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'

function Layout({children}:{children:ReactNode}) {
  return (
      <div className='flex min-h-screen min-w-full bg-background max-h-screen flex-col'>
       <nav className='flex items-center justify-between border-b border-border h-[60px] px-4 py-2 '>
        <Logo/>
      <div className='flex gap-4 items-center'>
        <ThemeSwicher/>
        <UserButton afterSignOutUrl='/sign-in'/>
      </div>
       </nav> 
       <main className='flex w-full flex-grow'>{children}</main>
      </div>
  )
}

export default Layout