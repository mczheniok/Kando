"use client";

import styles from "../account.module.css";
import { Suspense } from "react";
import Loading from "@/components/loader";
import Image from "next/image";
import { ButtonWithIcon } from "@/shared/Buttons/Buttons";
import { useState } from "react";
import { toServer } from "@/features/functions/functions";
import { useToServer } from "../../../shared/hooks/useToServer";
import { usePathname } from "next/navigation";

import BuyIcon from "@/icons/buy.svg"; 
import MoreIcon from "@/icons/more.svg";


import { LinkStyled } from "@/shared/link/link";


const listTargets = [
    {title: "Я",url: "/",prefetch: true},
    {title: "Архів",url: "/archive",prefetch: false},
    {title: "Оголошення",url: "/ogoloshennia",prefetch: false},
    {title: "Повідомлення",url: "/messages",prefetch: false},
    {title: "Історія",url: "/history",prefetch: false},
    {title: "Створити",url: "/create",prefetch: true},
    {title: "Безпека",url: "/safety",prefetch: false}
]

const UserAvatar = ({width,height,padding=null,src}) => {
    const [imgUrl,setImgUrl] = useState(src.includes("h3.googleusercontent.com")?src:`${process.env.NEXT_PUBLIC_URL}/images/${src}`);

    return (
        <Image width={width} priority={true} loading="eager" height={height} src={imgUrl} onError={() => setImgUrl("/assets/noimage.webp")} style={{padding: padding?padding:"7px",objectFit: "cover",background: "#e5e4e2",border:"none",boxSizing: "content-box"}} className="circle" alt="User Avatar"></Image>
    )
}

export const MoreButton = ({userData}) => {
    const [more,SetMore] = useState(false);

    return (
        <div className={`${styles.ButtonAcaunt} flex flex-row align-center justify-between`}>
            <Suspense fallback={<Loading time={0} />}>
            <UserAvatar padding={"0px"} src={`${userData?.image}`}  width={30} height={30}></UserAvatar>
            <div className="flex flex-col align-start" style={{gap: '.1rem',width: "fit-content",maxWidth: "56% "}}>
                <h4 className="small-text">{userData?.name}</h4>
                <h5>{userData?.email?.slice(0,10) || "email"}</h5>
            </div>                        
            <button onClick={() => SetMore(!more)} style={{border:"none",background: "none",cursor: "pointer",width: 'fit-content'}}>
                <MoreIcon width={25} height={25}></MoreIcon>
            </button>
            <ul className={`${styles.more} ${more?styles.moreVisible:""} flex flex-col`}>
                <li className={styles.buttonDropList} onClick={() => {
                    toServer("/account/exit",{
                        method: "DELETE",
                        headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
                        credentials: "include",
                    },false)
                    .then(res => {
                        res.status === "finally"?window.location.pathname = "/login":undefined
                        localStorage.removeItem("token");
                    })
                    .catch(err => console.log(err)); 
                }}><h4 style={{color: "red"}}>Вийти</h4></li>
            </ul>
        </Suspense>
    </div> 
    )
}


export function LeftBar({visible}) {
    const [_,data] = useToServer("/account/me",{
        headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
        credentials: "include",
    },false,false);   

    const pathname = usePathname().split("/").filter(e => e !== "");

    return (
        <aside className={`${styles.aside} ${visible ? styles.visible : ""} flex-col align-center`}>
            <ul data-id={"asideList"}  className={`${styles.asideList} flex-col justify-around align-center`} style={{marginTop: "1rem"}}>
                <Suspense fallback={<Loading/>}>
                    <UserAvatar src={`${data?.image}`} width={100} height={100} />
                </Suspense>
                {listTargets.map((el,ind) => {
                    return (
                            <li key={`account-page-el-${ind}`} onClick={() => {}} className="flex align-center" style={{gap: "0rem"}}>
                                {el.icon}
                                <LinkStyled size={`h3-text ${el.url.replace("/","") === pathname[1]?"active":""}`} el={el.title} url={`/account${el.url}`}></LinkStyled>
                            </li>
                        )
                    })
                }
                <div style={{padding: "0rem 1rem",width: "100%"}}>
                    <ButtonWithIcon Icon={BuyIcon} clName={"justify-around"} style="dark" title={"план"} />
                </div> 
            </ul>  
            <div style={{padding: "0rem 1rem"}}>
                <MoreButton userData={data} />
            </div>       
        </aside>
    )
}

export function ShowLeftBar({state,set}) {
    return (
        <button className={`${styles.Open} circle`} onClick={e => set(!state)}>
            {!state?"↩️":"↪️"}
        </button>  
    )
}

export function LeftBarContainer() {
    const [visible,setVisible] = useState(false);

    return (
        <>
            <LeftBar visible={visible}></LeftBar>
            <ShowLeftBar state={visible} set={setVisible}></ShowLeftBar>
        </>
    )
}