import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/"} className='font-bold text-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-transparent bg-clip-text'>CADMUS</Link>
  )
}

export default Logo