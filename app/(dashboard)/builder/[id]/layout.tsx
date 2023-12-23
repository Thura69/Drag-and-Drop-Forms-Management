import React, { ReactNode } from 'react'

function Layout({children}:{children:ReactNode}) {
  return (
      <div className='flex w-full flex-col flex-grow  justify-center  items-center'>{children}</div>
  )
}

export default Layout