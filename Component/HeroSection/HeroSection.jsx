import React, {useState, useContext} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from "./HeroSection.module.css"
import images from '../../ima'
import {Token, Search} from '../index'

const HeroSection = (accounts, tokenData) => {
  //use state
  const [openSetting, setopenSetting] = useState(false)
  const [openToken, setopenToken] = useState(false)
  const [openTokenNext, setopenTokenNext] = useState(false)

  //Token1
  const [token1, setToken1] =useState({
    name:"",
    image:"",
  })
  //Token2
  const [token2, setToken2] =useState({
    name:"",
    image:"",
  })
  return (
    <div className={Style.HeroSection}>
      <div className={Style.HeroSection_wrap}>
        <div className={Style.HeroSection_wrap_heading}>
          <p>Swap</p>
          <div className={Style.HeroSection_wrap_heading_image}>
            <Image src={images.set} alt='image' width={50} height={50} onClick={()=>setopenSetting(true)}/>
          </div>
        </div>

        <div className={Style.HeroSection_wrap_input}>
          <input type='text' placeholder='0'/>
          <button onClick={()=>setopenToken(true)}>
            <Image src={setToken2.image || images.ethlg} width={20} height={20} alt='ether'/>
            {token1.name || "ETH"}
            <small>1234</small>
          </button>
          
        </div>
        <div className={Style.HeroSection_wrap_input}>
          <input type='text' placeholder='0'/>
          <button onClick={()=>setopenTokenNext(true)}>
            <Image src={setToken2.image || images.homeicon} width={20} height={20} alt='ether'/>
            {token2.name || "DAI"}
            <small>5678</small>
          </button>
          
        </div>
        {accounts ? (
          <button className={Style.HeroSection_wrap_btn}>Connect Wallet</button>
          ) : (
            <button className={Style.HeroSection_wrap_btn} onClick={()=>{}}>
              Swap
            </button> 
        )}
      </div>

      {openSetting && <Token setopenSetting ={setopenSetting}/>}

      {openToken &&(
        <Search openToken={setopenToken} tokens={setToken1} tokenData={tokenData}/>
      )}

      {openTokenNext &&(
        <Search openToken ={setopenTokenNext} tokens={setToken2} tokenData={tokenData}/>
      )}
    </div>
  )
}

export default HeroSection