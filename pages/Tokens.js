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
            price: "$12,345",
            change: "+ 2,345",
            tvl: "$7894M",
            volume: "$716.5M"
        },
        {
            number: 2,
            images: images.ethlg,
            name: "USDC Coin",
            symbol: "USDC",
            price: "$12,345",
            change: "+ 2,345",
            tvl: "$7894M",
            volume: "$716.5M"
        },
        {
            number: 3,
            images: images.ethlg,
            name: "Siswap",
            symbol: "SIS",
            price: "$12,345",
            change: "+ 2,345",
            tvl: "$7894M",
            volume: "$716.5M"
        }
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
                <h2>Top tokens on Uniswap</h2>
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