"use client"
import { Suspense } from "react";
import styles from "./user.module.css";
import { ServerLoader } from "@/shared/blocks/serverLoader";
import dynamic from "next/dynamic";
import { useToServer } from "@/shared/hooks/useToServer";
import { UserAvatar } from "@/shared/blocks/Image/user";
import { parseLastLogin , parsePhoneNumber } from "@/features/functions/functions";
import { Ref } from "@/shared/Buttons/Buttons";

import VerifySVG from "@/icons/verify.svg";


function UserBlock({userData}) {
    const { 
        image,
        phone,
        username,
        last_login,
        created_at,
        is_verified
    } = userData;


    return (
        <div className={`${styles.userInfoContainer}`} style={{height: "100%"}}>
            <div className="flex flex-col align-center justify-center" style={{width: "100%",height: "100%"}}>
                <UserAvatar image={"/assets/crying.png"} width={120} height={120}></UserAvatar>
            </div>
            <div className="flex flex-col" style={{width: "100%",height: "100%"}}>
                <span className="flex flex-row align-center" style={{width: "100%"}}>
                    <p className="h1-text">{username}</p>
                    {is_verified && (
                        <p title="Цей акаунт є офіційним">
                            <VerifySVG width={27} height={27} />
                        </p>
                    )}
                </span>
                <p className="h2-text" style={{fontWeight: "300",color: "green"}}>🟢 онлайн {parseLastLogin(last_login)}</p>
                <p className={`${styles.secondaryText} h3-text`}>телефон: {parsePhoneNumber(phone)}</p>
                <p className={`${styles.secondaryText} h4-text`}>дата реєстрації {parseLastLogin(created_at)}</p>
            </div>
            <div className="flex flex-row align-center" style={{marginTop: "1rem",gridColumn: "1 / -1  "}}>
                <Ref link={`tel:+${phone}`} style={"orange"} clName="flex-grow" title={"📞 Зателефонувати"}></Ref>
                <Ref link={`/account/message/chat`} style={"orange"} clName="flex-grow" title={"💬 Зателефонувати"}></Ref>
            </div>
        </div>
    )
}


export function UserInfo({location,userId}) {
    const [load,userData] = useToServer(`/user/${userId}`,{},false,false);
    
    const LazyMap = dynamic(() => import("@/components/Map/map").then(mod => ({default: mod.default})));

    return (
        <section className={`${styles.userContainer} flex flex-col`}>
            <div className={styles.userBlock} style={{gridColumn: !location?"span 2":"1"}}>
                {!userData ? <ServerLoader height={"300px"} />
                :
                    <UserBlock userData={userData}/>
                }
            </div>
            <div className={styles.mapBlock}>
                {location && (
                    <Suspense fallback={<ServerLoader />}>
                        {typeof window !== "undefined" && JSON.parse(location)? <LazyMap title="ваш дім" position={[4,38]} height={"100%"}></LazyMap> : ""}
                    </Suspense>
                )}
            </div>
        </section>
    )
}