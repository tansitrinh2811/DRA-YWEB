import React, {useState, useEffect, useContext} from 'react'
import Image from "next/image"
import Link from "next/link"
//IMPORT INTERNAL
import Style from './NavigationBar.module.css'
import images from '../../ima'
import{Model, ListToken} from '../index'

//context
import { SwapTokenContext } from '../../Context/SwapContext'

const NavigationBar = () => {
  const { ether, account, networkConnect, connectWithWallet, tokenData } = useContext(SwapTokenContext)
  const menuItem = [
    {
      name: "Swap",
      link:"/",
    },
    {
      name: "Tokens",
      link:"/",
    },
    {
      name: "Pools",
      link:"/",
    },
  ];
  //USESTATE
  const [openModel, setopenModel] = useState(false)
  const [openTokenBox, setopenTokenBox] = useState(false)
  //const[account, setAccount] = useState(false)
  return (
    <div className={Style.NavigationBar}>
      <div className={Style.NavigationBar_wrap}>
        <div className={Style.NavigationBar_wrap_left}>
          {/*//Logo cua uniswap*/}
          <div className={Style.NavigationBar_wrap_left_image}>
            <Image src={images.uniswap} alt='logo network' width={50} height={50}/>
          </div>
           {/*//Menu*/}
          <div className={Style.NavigationBar_wrap_left_menu}>
            {menuItem.map((el, i)=>(
              <Link
              key={i+1}
              href = {{pathname: `${el.name}`, query: `${el.link}` }}>
                <p className={Style.NavigationBar_wrap_left_menu_item}>{el.name}</p>
              </Link>
            ))}
          </div>
        </div>
         {/*//Phan o giua(mid section)*/}
        <div className={Style.NavigationBar_wrap_mid}>
            <div className={Style.NavigationBar_wrap_mid_search}>
              <div className={Style.NavigationBar_wrap_mid_search_image}>
                <Image src={images.lookup} alt="search" width={20} height={20}/>
              </div>
               {/*//Phan nhap vao(input)*/}
               <input type="text" placeholder="Search Tokens"/>
            </div>
        </div>
        {/*//Phan ben phai(right section)*/}
        <div className={Style.NavigationBar_wrap_right}>
          <div className={Style.NavigationBar_wrap_right_box}>
            <div className={Style.NavigationBar_wrap_right_box_image}>
              <Image src={images.ethnw} alt="Network" height={30} width={30}/>
            </div>
            <p>{networkConnect}</p>
          </div>
          {
            account ? (
              <button onClick={()=>setopenTokenBox(true)}>
                {account.slice(0,20)}...
              </button>
              ) : (
              <button onClick={()=>setopenModel(true)}>Connect</button>
                )
          }
        
          {openModel && (
            <Model setopenModel={setopenModel} connectWallet={connectWithWallet}/>
          )}
        </div>
      </div>

       {/*//Danh sach token tren he thong*/}
       {openTokenBox &&(
          <ListToken tokenDate={tokenData} setopenTokenBox={setopenTokenBox}/>
       )}
    </div>
    )
}

export default NavigationBar