import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./ListToken.module.css";
import images from "../../imagetotal";

const ListToken = ({ tokenDate, setOpenTokenBox }) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  let listToken = [];
  for (let i = 0; i < tokenDate.length; i++) {
    if (i % 2 == 1) listToken.push(tokenDate[i]);
  }

  return (
    <div className={Style.ListToken_container}>
      <div className={Style.ListToken}>
        <p
          className={Style.ListToken_close}
          onClick={() => setOpenTokenBox(false)}
        >
          <Image src={images.close} alt="close" width={50} height={50} />
        </p>

        <div className={Style.ListToken_title}>
          <h2>Your Token List</h2>
        </div>

        {listToken.map((el, i) => (
          <div className={Style.ListToken_box}>
            <div className={Style.ListToken_box_info}>
              <p className={Style.ListToken_box_info_symbol}>{el.symbol}</p>
              <p>
                <span>{el.tokenBalance.slice(0, 9)}</span> {el.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListToken;
