import React from "react";
import Image from "next/image";
//INTERNAL IMPORT
import Style from "./ShowTok.module.css";
import images from "../../imagetotal";

const ShowToken = ({ showTokenList }) => {
  return (
    <div className={Style.ShowToken}>
      <div className={Style.ShowToken_wrap}>
        <div className={Style.ShowToken_wrap_header}>
          <p className={Style.hide}>#</p>
          <p>Token name</p>
          <p>Price</p>
          <p className={Style.hide}>ValueLockedUSD</p>
          <p className={Style.hide}>
            txCount{" "}
            <small>
              <Image
                src={images.question_box}
                alt="img"
                width={15}
                height={15}
              />
            </small>{" "}
          </p>
          <p className={Style.hide}>
            <small>
              <Image src={images.arrowPrice} alt="img" width={15} height={15} />
            </small>{" "}
            Total Supply{" "}
            <small>
              <Image
                src={images.question_box}
                alt="img"
                width={15}
                height={15}
              />
            </small>{" "}
          </p>
        </div>

        {showTokenList.map((el, i) => (
          <div className={Style.ShowToken_wrap_list} >
            <p className={Style.hide}>{i + 1}</p>
            <p className={Style.ShowToken_wrap_list_para}>
              <small>
                <Image
                  src={images.dra_yswap}
                  alt="logo"
                  width={25}
                  height={25}
                />
              </small>
              <small>{el.name}</small>
              <small>{el.symbol}</small>
            </p>
            <p>{el.volumeUSD}</p>
            <p className={Style.hide}>{el.price}</p>
            <p className={Style.hide}>{el.txCount}</p>
            <p className={Style.hide}>{el.totalSupply}</p>
          </div>
        ))} 
      </div>
    </div>
  );
};

export default ShowToken;
