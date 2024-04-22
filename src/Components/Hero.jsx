import React from 'react'
import { Link } from 'react-router-dom'

import playIcon from '../Assets/Icons/play.svg'
import HeroImg from '../Assets/Images/hero-img.png'

const Hero = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-2 my-8'>
      <div className="flex-1">
        <div className="mb-4 text-center md:text-start text-5xl font-bold lg:w-3/4">
          <h1>
            Welcome to <span className='text-blue-700'>SaveDirectly!</span>
          </h1>
          <h1 className="">Where Every Transaction Tells a Story</h1>
        </div>
        <p className="mb-8 text-center md:text-start text-xl text-gray-500">
          Unlock a new era of financial empowerment with SaveDirectly. Our USSD-powered platform transforms the way you spend and save.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-8">
          <Link to='/login' className="bg-blue-400 px-4 py-2 rounded-lg hover:bg-strong shadow-xl">
            <button className='text-2xl font-semibold text-white'>Get Started</button>
          </Link> 
          <button className="flex items-center gap-2 border border-blue-400 rounded-lg px-4 py-2 shadow-xl">
            <img src={playIcon} alt="play icon" className="h-6 w-6" />
            <span className="">Watch Video</span>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <img src={HeroImg} alt="hero" className="w-full" />
      </div>
    </div>
  )
}

export default Hero