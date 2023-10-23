import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Connect.module.css";
import images from "../../imagetotal";

const Connect = ({ setOpenModel, connectWallet }) => {
  //USESTATE
  const walletMenu = ["MetaMask", "Coinbase", "Wallet", "WalletConnet"];
  return (
    <div className={Style.Connect}>
      <div className={Style.Connect_wrap}>
        <div className={Style.Connect_wrap_heading}>
          <p>Connect a wallet</p>
          <div className={Style.Connect_wrap_heading_img}>
            <Image
              src={images.close}
              alt="logotoken"
              width={50}
              height={50}
              onClick={() => setOpenModel(false)}
            />
          </div>
        </div>

        <div className={Style.Connect_wrap_wallet}>
          {walletMenu.map((el, i) => (
            <p key={i + 1} onClick={() => connectWallet()}>
              {el}
            </p>
          ))}
        </div>

        <p className={Style.Connect_wrap_section}>
          By connecting a wallet, you agree to Dra_yswap
          <br /> Terms of Service and consent to its Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Connect;
