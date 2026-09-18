import React from 'react'

const Home = () => {
  return (
   <div className="relative w-full h-screen overflow-hidden bg-[#021008]">
  {/* Main image */}
  {/* <img
    src="/images/home.png"
    alt=""
    className="absolute inset-0 z-10 w-full h-full object-cover"
  /> */}

  {/* Texture overlay */}
  <img
    src="/textures/black.jpg"
    alt=""
    className="absolute inset-0 z-20 w-full h-screen   pointer-events-none opacity-10"
  />

  <div className="text-6xl text-white left-[30%] top-[40%] absolute z-50">
    <h1>hello my name is ayaan </h1>
  </div>
</div>
  )
}

export default Home