import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './App.css'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      { /*Hero */}
      <Hero/>
    </>
  )
}

export default App
