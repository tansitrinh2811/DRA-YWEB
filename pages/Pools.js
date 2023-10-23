import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import images from "../imagetotal";
import Style from "../styles/Pools.module.css";

import { SwapTokenContext } from "../Context/SwapContext";
import { LiqPoolAdd, LiqPoolConnect } from "../Component/index";

const Pool = () => {
  const { account, createLiquidityAndPool, tokenData, getAllLiquidity } =
    useContext(SwapTokenContext);

  const [closePool, setClosePool] = useState(false);
  return (
    <div className={Style.Pool}>
      {closePool ? (
        <LiqPoolAdd
          account={account}
          setClosePool={setClosePool}
          tokenData={tokenData}
          createLiquidityAndPool={createLiquidityAndPool}
        /> 
      ) : (
        <LiqPoolConnect
          setClosePool={setClosePool}
          getAllLiquidity={getAllLiquidity}
          account={account}
        />
       )} 
    </div>
  );
};

export default Pool;
