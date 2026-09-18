"use client"
import React from 'react'
import { Video } from './pages/Video'
import Grid from './pages/Grid'
import New from './pages/new' 
import Home from './pages/Home' 
import {  Work } from './pages/projects/Parallaxvideos' 
import Stories from './pages/projects/Stories'
import Questions from './pages/Questions'

const Page = () => {
  return (
  <div className=" ">
  
 
 
    <Home />  
    <Video />  
    <Grid /> 
    <Work />  
    <Stories />  
    <Questions />  
    
    <New />


</div>
  )
}

export default Page