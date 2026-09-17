import React from 'react'
import { Video } from './pages/Video'
import Grid from './pages/Grid'
import New from './pages/new' 
import Home from './pages/Home' 
import {  Work } from './pages/projects/Parallaxvideos'

const Page = () => {
  return (
  <div className=" ">
  
 
 
    <Home />  
    <Video />  
    <Grid /> 
    <Work />  
    <New />


</div>
  )
}

export default Page