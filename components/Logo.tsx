import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={"/"} className='font-bold text-3xl bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text'>PageForm</Link>
  )
}

export default Logo