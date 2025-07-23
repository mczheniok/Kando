"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./cards.module.css"
import { parseData } from "@/features/functions/functions";


export function CardBlock({Icon,title,click,href}){
    return (
        <Link href={href} onClick={() => click && click()}  className={`${styles.Card} flex flex-row align-center flex-wrap`}>
            <Icon width={40} height={40} />   
            <span className="flex flex-col">
                <h3>{title}</h3>
            </span>
        </Link>
    )
}

// export function CardBlockPicture({title,text,img,src}){
//     return (
//         <div className={`${styles.Card} flex flex-row align-center flex-wrap`} >
//             <picture className="flex flex-row align-center justify-center" >
//                 <source srcSet={src} type="image/webp" />
//                 <img src={img} alt="🚀" width="45" height="45" />
//                 <h3 >{title}</h3>
//             </picture>
//             <span className="flex flex-col">
//                 <p style={{color: '#555555'}}>{text}</p>
//             </span>
//         </div>
//     )
// }


export function Chat({obj,click}) {
    const {
        id,
        is_active,
        chat_type,
        display_name,
        unread_count,
    }  = obj

    let last_message = {}

    if(typeof last_message !== "undefined" && last_message !== null) {
        last_message = obj.last_message
    }



    const previewEmoji = chat_type => {
        switch (chat_type) {
            case "direct": return "👨";
            case "bot": return "🤖";
        }
    }


    return (
        <article onClick={() => click(id,chat_type)} className={styles.ChatItem}>
            <div className={`flex flex-col align-center justify-center`} style={{position: "relative"}}>
                {/* <Image src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${imgSrc}`} onErrorCapture={e => setImgSrc("/assets/noimage.webp")} alt="Auto" width={100} height={100}  style={{objectFit:"cover",borderRadius: "1rem",aspectRatio: '1',width: "100%",height: "100%"}}></Image> */}
                <p className={`${styles.ChatImage} h1-text circle flex justify-center align-center`}>
                    {previewEmoji(chat_type)}
                </p>
                <div className={`${styles.OnlineIndicator} circle`}></div>
            </div>
            
            <section className={`flex flex-col justify-around`} >
                <h1 className="h1-text">{display_name}</h1>
                <h3 className={styles.LastMessage}>{last_message?.text || last_message?.bot_response || ""}</h3>
            </section>
            <section className={`flex flex-col align-end justify-between`}>
                {last_message?.sent_at && (
                    <p className={`${styles.ChatTime} h3-text`}>{parseData(last_message?.sent_at)}</p>
                )}
                {unread_count > 0 && (
                    <p className={`${styles.UnreadBadge} h3-text circle flex justify-center align-center`}>
                        {unread_count} 
                    </p>
                )}
            </section>
        </article>
    )
}