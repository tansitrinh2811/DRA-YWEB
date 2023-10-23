import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

//IMPORT INTERNAL
import Style from "./NavigationBar.module.css";
import images from "../../imagetotal";
import { Connect, ListToken } from "../index";
import IMAGE from "../index";

//CONTEXT
import { SwapTokenContext } from "../../Context/SwapContext";

const NavigationBar = () => {
  const { ether, account, networkConnect, connectWallet, tokenData } =
    useContext(SwapTokenContext);
  const menuItems = [
    {
      name: "Swap",
      link: "/",
    },
    {
      name: "Tokens",
      link: "/",
    },
    {
      name: "Pools",
      link: "/",
    },
  ];

  //USESTATE
  const [openModel, setOpenModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);
  // const [account, setAccount] = useState (false);

  return (
    <div className={Style.NavigationBar}>
      <Head>
        <title>DRA_YSWAP Interface</title>
      </Head>
      <div className={Style.NavigationBar_wrap}>
        <div className={Style.NavigationBar_wrap_left}>
          {/* //LOGO IMAGE  */}
          <div className={Style.NavigationBar_wrap_left_img}>
            <Image src={images.dra_yswap} alt="logo" width={50} height={50} />
          </div>
          {/* MENU ITEMS */}
          <div className={Style.NavigationBar_wrap_left_menu}>
            {menuItems.map((el, i) => (
              <div>
                <Link key={i + 1} href={{ pathname: `${el.name}` }}>
                  <p className={Style.NavigationBar_wrap_left_menu_item}>{el.name}</p>
                </Link>
              </div>
            ))}
            <div>
              <a
                href=""
                target="_blank"
              >
                <p className={Style.NavigationBar_wrap_left_menu_item}>Market</p>
              </a>{" "}
            </div>
            <div>
              <a href="http://127.0.0.1:5500/file_static/index.html">
                <p className={Style.NavigationBar_wrap_left_menu_item}>Introduce</p>
              </a>{" "}
            </div>
          </div>
        </div>
        <div></div>

        {/* //RIGHT SECTION */}
        <div className={Style.NavigationBar_wrap_right}>
          <div className={Style.NavigationBar_wrap_right_wrap}>
            <div className={Style.NavigationBar_wrap_right_wrap_img}>
              <Image
                src={images.networksw}
                alt="NetWork"
                height={30}
                width={30}
              />
            </div>

            <p>{networkConnect}</p>
          </div>

          {account ? (
            <button onClick={() => setOpenTokenBox(true)}>
              {account.slice(0, 10)}...{" "}
            </button>
          ) : (
            <button onClick={() => setOpenModel(true)}>Connect</button>
          )}

          {openModel && (
            <Connect setOpenModel={setOpenModel} connectWallet={connectWallet} />
          )}
        </div>
      </div>

      {/* //TOTENLIST COMPONENT */}
      {openTokenBox && (
        <ListToken tokenDate={tokenData} setOpenTokenBox={setOpenTokenBox} />
      )}
    </div>
  );
};

export default NavigationBar;
