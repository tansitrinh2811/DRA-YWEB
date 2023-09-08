import React, {useState, useContext, useEffect} from 'react'

//INTERNAL IMPORT
import {HeroSection} from "../Component/index"

const index = () => {
  return (
    <div>
      <HeroSection accounts="hey" tokenData="DATA"/>
    </div>
  )
}

export default index