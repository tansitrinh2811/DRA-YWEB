import React, {useState, useEffect} from 'react'
import Image from "next/image"

//IMPORT INTERNAL
import Style from './Token.module.css'
import images from '../../ima'
import {Swap} from '../index'
const Token = ({setopenSetting}) => {
  return (
    <div className={Style.Token}>  
        <div className={Style.Token_wrap}>
            <div className={Style.Token_wrap_heading}>
                <h4>Setting</h4>
                <Image src={images.set} alt='close' width={50} height={50} onClick={()=>setopenSetting(false)}/>
            </div>
            <p className={Style.Token_wrap_content}>
                Slippage tolarance{""}
                <Image src={images.lock} alt='img' width={20} height={20}/>
            </p>

            <div className={Style.Token_wrap_input}>
                <button>Auto</button>
                <input type='text'  placeholder='0.10%'/>
            </div>

            <p className={Style.Token_wrap_content}>
                Slippage tolarance{""}
                <Image src={images.lock} alt='img' width={20} height={20}/>
            </p>

            <div className={Style.Token_wrap_input}>
                <input type='text'  placeholder='30'/>
                <button>minutes</button>
            </div>

            <h2>Interface Setting</h2>
            <div className={Style.Token_wrap_swap}>
                <p className={Style.Token_wrap_content}>Transaction deadline</p>
                <Swap label='No' />
            </div>
        </div>
    </div>
  )
}

export default Token