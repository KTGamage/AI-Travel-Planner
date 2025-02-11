import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 '>
      <img className='h-8' src='/logo.svg'/>
      <div>
        <Button>Sign In</Button>
        
      </div>
    </div>
  )
}

export default Header