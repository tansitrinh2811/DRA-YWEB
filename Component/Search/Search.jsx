import React, {useState} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './Search.module.css'
import images from '../../ima'

const Search = ({openToken, tokens, tokenData}) => {
  //use state
  const[active, setActive] = useState(1)

  const coin=[
  {
    img: images.ethnw,
    name: "ETH"
  },
  {
    img: images.homeicon,
    name: "DAI"
  },
  {
    img: images.ethnw,
    name: "WETH"
  },
  {
    img: images.ethnw,
    name: "DOGE"
  },
  {
    img: images.ethnw,
    name: "GALA"
  },
  {
    img: images.ethnw,
    name: "INU"
  },
  {
    img: images.ethnw,
    name: "TIME"
  },
  {
    img: images.ethnw,
    name: "LOGO"
  },
  {
    img: images.ethnw,
    name: "CHESS"
  },
  {
    img: images.ethnw,
    name: "ID"
  },
]
  return (
    <div className={Style.Search}>
      <div className={Style.Search_wrap}>
        <div className={Style.Search_wrap_heading}>
          <h4>Select a token</h4>
          <Image src={images.set} alt='close' width={50} height={50} onClick={()=>openToken(false)}/>
        </div>

        <div className={Style.Search_wrap_find}>
          <div className={Style.Search_wrap_find_image}>
            <Image src={images.lookup} alt='img' width={20} height={20}/>
          </div>
          <input type='text' placeholder='Search name and past the address'/>
        </div>

        <div className={Style.Search_wrap_coin}>
          {coin.map((el,i)=>(
            <span key={i+1} className={active == i+1?`${Style.active}`:""} onClick={()=>(setActive(i+1), tokens({name: el.name, image: el.img}))}>
              <Image src={el.img || images.ethnw || images.homeicon} alt='image' width={30} height={30}/>

              {el.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search