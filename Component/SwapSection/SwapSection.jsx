import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./SwapSection.module.css";
import images from "../../imagetotal";
import {  Search } from "../index";

import { SwapTokenContext } from "../../Context/SwapContext";
import TokenChoice from "../TokenChoice/TokenChoice";

const SwapSection = ({}) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const [tokenSwapOutPut, setTokenSwapOutPut] = useState(0);
  const [poolMessage, setPoolMessage] = useState("");
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);

  const {
    singleSwapToken,
    connectWallet,
    account,
    tokenData,
    getPrice,
    swapUpdatePrice,
  } = useContext(SwapTokenContext);

  //TOKEN 1
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  //TOKEN 2
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  const callOutPut = async (value) => {
    const yourAccount = "0x28C6c06298d514Db089934071355E5743bf21d60";
    const deadline = 10;
    const slippageAmount = 25;
    console.log(value);
    console.log(yourAccount);
    const data = await swapUpdatePrice(
      value,
      slippageAmount,
      deadline,
      yourAccount
    );
    console.log(value);
    console.log(data);

    setTokenSwapOutPut(data[1]);
    setSearch(false);

    const poolAddress = "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8";
    const poolData = await getPrice(value, poolAddress);
    const message = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[1]}`;
    // console.log(message);
    setPoolMessage(message);
  };

  //JSX
  return (
    <div className={Style.SwapSection}>
      <div className={Style.SwapSection_wrap}>
        <div className={Style.SwapSection_wrap_heading}>
          <p>SWAP</p>
          <div className={Style.SwapSection_wrap_heading_img}>
            <div className={Style.SwapSection_settings}>
              <Image
                src={images.setting_cross}
                alt="image"
                width={50}
                height={50}
                onClick={() => setOpenSetting(true)}
              />
            </div>
          </div>
        </div>

        <div className={Style.SwapSection_wrap_input}>
          <input
            type="number"
            placeholder="0"
            onChange={(e) => (
              callOutPut(e.target.value),
              setSwapAmount(e.target.value),
              setSearch(true)
            )}
          />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={tokenOne.image || images.etherlgsymbol}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenOne.symbol || "ETH"}
            <small>{tokenOne.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        <div className={Style.SwapSection_wrap_input}>
          {/* <input type="number"placeholder="0" /> */}

          <p>
            {search ? (
              <Image
                src={images.loading}
                width={100}
                height={40}
                alt="loading"
              />
            ) : (
              tokenSwapOutPut
            )}
          </p>

          <button onClick={() => setOpenTokensTwo(true)}>
            <Image
              src={tokenTwo.image || images.etherlgsymbol}
              width={20}
              height={20}
              alt="ether"
            />
            {tokenTwo.symbol || "DAI"}
            <small>{tokenTwo.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        {search ? (
          <Image src={images.loading} width={100} height={40} alt="loading" />
        ) : (
          poolMessage
        )}

        {account ? (
          <button
            className={Style.SwapSection_wrap_btn}
            onClick={() =>
              singleSwapToken({
                token1: tokenOne,
                token2: tokenTwo,
                swapAmount,
              })
            }
          >
            Swap
          </button>
        ) : (
          <button
            className={Style.SwapSection_wrap_btn}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {openSetting && <TokenChoice setOpenSetting={setOpenSetting} />}

      {openToken && (
        <Search
          openToken={setOpenToken}
          tokens={setTokenOne}
          tokenData={tokenData}
        />
      )}
      {openTokensTwo && (
        <Search
          openToken={setOpenTokensTwo}
          tokens={setTokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  );

  //return <div>SwapSection</div>;
};

export default SwapSection;
