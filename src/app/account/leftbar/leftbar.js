"use client";

import styles from "../account.module.css";
import { Suspense } from "react";
import Loading from "@/components/loader";
import Image from "next/image";
import { ButtonWithIcon } from "@/shared/Buttons/Buttons";
import { useState } from "react";
import { toServer } from "@/features/functions/functions";
import BuyIcon from "@/icons/buy.svg"; 
import UserIcon from "@/icons/user.svg"
import ArchiveIcon from "@/icons/archive.svg"
import NewIcon from "@/icons/new.svg"
import MessagesIcon from "@/icons/messages.svg";
import HistoryIcon from "@/icons/history.svg";
import MoreIcon from "@/icons/more.svg"
import { LinkText } from "@/shared/link/link";

const listTargets = [
    {title: "Я",icon: <UserIcon width={25} height={25}></UserIcon>},
    {title: "архів",icon: <ArchiveIcon width={25} height={25} />},
    {title: "Оголошення",icon: <NewIcon width={25} height={25} />},
    {title: "Повідомлення",icon: <MessagesIcon width={25} height={25} />},
    {title: "Історія",icon: <HistoryIcon width={25} height={25} />}
]

const UserAvatar = ({width,height,padding=null,src}) => {
    const [imgUrl,setImgUrl] = useState(`${process.env.NEXT_PUBLIC_URL}/images/${src}`);

    return (
        <Image width={width} height={height} src={imgUrl} onError={() => setImgUrl("/assets/noimage.webp")} style={{padding: padding?padding:"7px",background: "#e5e4e2",border:"none",boxSizing: "content-box"}} className="circle" alt="User Avatar"></Image>
    )
}

export const MoreButton = ({userData}) => {
    const [more,SetMore] = useState(false);

    return (
        <div className={`${styles.ButtonAcaunt} flex flex-row align-center justify-between`}>
            <Suspense fallback={<Loading time={0} />}>
            <UserAvatar padding={"0px"} src={userData?.image}  width={30} height={30}></UserAvatar>
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


export function LeftBar({visible,ref,userData,set,close}) {
    const handleClickPage = (ind) => {
        close()
        set(ind)
    }


    return (
        <aside className={`${styles.aside} ${visible ? styles.visible : ""} flex-col align-center`}>
            <ul data-id={"asideList"} ref={ref} className={`${styles.asideList} flex-col justify-around align-center`} style={{marginTop: "1rem"}}>
                <Suspense fallback={<Loading/>}>
                    <UserAvatar src={userData?.image} width={100} height={100}></UserAvatar>
                </Suspense>
                {listTargets.map((el,ind) => {
                    return (
                        <li key={`account-page-el-${ind}`} onClick={() => handleClickPage(ind)} className="flex align-center" style={{gap: "0rem"}}>
                            {el.icon}
                            <LinkText el={el.title} ind={ind}></LinkText>
                        </li>
                    )
                })}
                <ButtonWithIcon Icon={BuyIcon} clName={"justify-around"} style="dark" title={"план"}></ButtonWithIcon>
            </ul>  
            <div style={{padding: "0rem 1rem"}}>
                <MoreButton userData={userData}></MoreButton>
            </div>  
        </aside>
    )
}