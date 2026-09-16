import React from 'react'
import { Video } from './pages/Video'
import Grid from './pages/Grid'
import New from './pages/new'

const Page = () => {
  return (
  <div className=" ">
  {/* Paper texture */}
  {/* <div
    className="pointer-events-none absolute inset-0 z-50 opacity-30 "
    style={{
      backgroundImage: "url('/textures/tecture2.jpg')",
        //  backgroundSize: "cover",
    // backgroundPosition: "center",
    }}
  /> */}

  {/* Content */}
 
    <Video />
  <div className="relative z-10">
    <Grid />
    <New />
  </div>
</div>
  )
}

export default Page