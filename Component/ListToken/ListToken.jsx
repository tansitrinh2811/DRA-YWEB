import React from 'react'
import Image from 'next/image'

//INTERSHIP IMPORT
import Style from "./ListToken.module.css"
import images from "../../ima"

const ListToken = ({ tokenDate, setopenTokenBox}) => {
  //const data = [1, 2, 3, 4, 5, 6, 7]

  return (
    <div className={Style.ListToken}>
      <p className={Style.ListToken_close} onClick={()=> setopenTokenBox(false) }>
        <Image src={images.set} alt='close' width={50} height={50}/>
      </p>
      <div className={Style.ListToken_title}>
        <h2>Owned tokens</h2>
      </div>
      {tokenDate.map((el, i) =>(
        <div className={Style.ListToken_wrap}>
          <div className={Style.ListToken_wrap_i4}>
            <p className={Style.ListToken_wrap_i4_icon}>{el.name}</p>
            <p>
              <span>{el.tokenBalance}</span> {el.symbol}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListToken