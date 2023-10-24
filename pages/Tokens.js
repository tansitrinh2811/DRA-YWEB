import React, {useState, useContext, useEffect} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from "../styles/Tokens.module.css"
import images from '../imagetotal'
import {ShowTok} from '../Component/index'   

const Tokens = () => {
    const [showTokenList, setShowTokenList] = useState([
        {
            number: 1,
            images: images.ethlg,
            name: "Ether",
            symbol: "ETH",
            price: "$1,816.07",
            change: "+ 7.06%",
            tvl: "$1.1B",
            volume: "$1.2B"
        },
        {
            number: 2,
            images: images.ethlg,
            name: "USDC Coin",
            symbol: "USDC",
            price: "$1.00",
            change: "+ 0.00%",
            tvl: "$637.4M",
            volume: "$771.3M"
        },
        {
            number: 3,
            images: images.ethlg,
            name: "Wrapped BTC",
            symbol: "WBTC",
            price: "$34,510",
            change: "+ 11.48%",
            tvl: "$7894M",
            volume: "$716.5M"
        },
        {
            number: 4,
            images: images.ethlg,
            name: "Tether USD",
            symbol: "USDT",
            price: "$1.00",
            change: "+ 0.00%",
            tvl: "$174.8M",
            volume: "$226.4M"
        },
        {
            number: 5,
            images: images.ethlg,
            name: "Dai Stablecoin",
            symbol: "DAI",
            price: "$1.00",
            change: "+ 0.00%",
            tvl: "$151.9M",
            volume: "$54.0M"
        },
        {
            number: 6,
            images: images.ethlg,
            name: "Pepe",
            symbol: "PEPE",
            price: "$0.000000956",
            change: "+ 25.79%%",
            tvl: "$12.9M",
            volume: "$32.0M"
        },
        {
            number: 7,
            images: images.ethlg,
            name: "ChainLink Token",
            symbol: "LINK",
            price: "$10.33",
            change: "- 4.26%%",
            tvl: "$17.7M",
            volume: "$28.1M"
        },
        {
            number: 8,
            images: images.ethlg,
            name: "Matic Token",
            symbol: "MATIC",
            price: "$0.650",
            change: "+ 3.78%",
            tvl: "$6.5M",
            volume: "$2.4M"
        },
        {
            number: 9,
            images: images.ethlg,
            name: "SHIBA IN",
            symbol: "SHI",
            price: "$0.000000761",
            change: "+ 4.18%",
            tvl: "$7.8M",
            volume: "$1.7M"
        },
        {
            number: 10,
            images: images.ethlg,
            name: "Wrapped SOL",
            symbol: "SOL",
            price: "$31.99",
            change: "+ 3.72%",
            tvl: "$215.7K",
            volume: "$587.3K    "
        },
    ])

    const [copyShowTokenList, setCopyShowTokenList] = useState(showTokenList)
    const [search, setSearch] = useState('')
    const [searchItem, setSearchItem] = useState(search)

    const onHandleSearch = (value) => {
        const filteredTokens = showTokenList.filter(({name}) => 
            name.toLowerCase().includes(value.toLowerCase())  
        )
        if(filteredTokens.length ===0){
            setShowTokenList(copyShowTokenList)
        }else{
            setShowTokenList(filteredTokens)
        }
    }

    const onClearSearch = () => {
        if(showTokenList.length && copyShowTokenList.length){
            setShowTokenList(copyShowTokenList)
        }
    }

    useEffect( () =>{
        const timer = setTimeout(() => setSearch(searchItem), 1000)
        return () => clearTimeout(timer)
    }, [searchItem])

    useEffect(() =>{
        if(search) {
            onHandleSearch(search)
        }else{
            onClearSearch()
        }
    }, [search])

    return (
        <div className={Style.Tokens}>
            <div className={Style.Tokens_wrap}>
                <h2>Top tokens on DRA-YSWAP</h2>
                <div className={Style.Tokens_wrap_header}>
                    <div className={Style.Tokens_wrap_ether}>
                        <p>
                            <Image src={images.etherlgsymbol} alt='ether' width={20} height={20}/>
                        </p>
                        <p>Ethereum</p>
                    </div>
                    <div className={Style.Tokens_wrap_search}>
                        <p>
                            <Image src={images.lookup} alt='image' width={20} height={20}/>
                        </p>
                        <input type='text' placeholder='Filter tokens' onChange={(e) => setSearchItem(e.target.value)} value={searchItem} />
                    </div>
                </div>
                <ShowTok showTokenList ={showTokenList} />
            </div>
        </div>
    )
}

export default Tokens