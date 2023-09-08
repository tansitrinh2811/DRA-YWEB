import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image';

//Internal import
import Style from "./Model.module.css"
import images from "./../../ima"
const Model = ({setopenModel, connectWallet}) => {

  const walletChoice= ["Metamask", "Coinbase", "Wallet", "WalletConnect"];
  return (
    <div className={Style.Model}>
      <div className={Style.Model_wrap}>
        <div className={Style.Model_wrap_heading}>
          <p>Connect a Wallet</p>
          <div className={Style.Model_wrap_heading_image}>
            <Image src={images.set} alt='lgcross' width={50} height={50} onClick={()=>setopenModel(false)}/>
          </div>
        </div>

        <div className={Style.Model_wrap_wallet}>
          {walletChoice.map((el, i)=>(
            <p key={i+1} onClick={()=> connectWallet()}>
              {el}
            </p>
          ))}
        </div>
        <p className={Style.Model_wrap_content}>
          By connecting a wallet, you agree to Uniswap Lab.
          <br />Terms of Service and consent to its Privacy Policy.
        </p>     
      </div>
    </div>
  )
};

export default Model
