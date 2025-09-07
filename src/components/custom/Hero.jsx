import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-orange-50 px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Discover Your Next Adventure with AI
          </span>
          <br />
          <span className="text-gray-900 text-2xl md:text-4xl lg:text-5xl">
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your personal trip planner and travel curator, creating custom itineraries 
          tailored to your interests and budget
        </p>

        <Link to={'/create-trip'}>
          <Button 
            size="lg"
            className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Hero