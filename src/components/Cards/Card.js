import Image from "next/image";
import Link from "next/link";
import styles from "./cards.module.css"



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


export function Message({obj,set}) {
    const { chat_name  , time , sender_name , chat_image ,  receiver_id , product_id , id} = obj; 
    const [imgSrc,setImgSrc] = useState(chat_image);

    const handleMessageClick = () => {
        localStorage.setItem("chat",JSON.stringify({
            chat_id: product_id,
            to_id: receiver_id, 
        }));

        localStorage.setItem("current_chat",JSON.stringify({
            current_chat: id,
            image: imgSrc,
            name: chat_name
        }))
        set(6);
    }

    return (
        <article onClick={handleMessageClick} className={`${styles.CardRow} flex flex-row`} style={{borderBottom: "solid var(--border) 2px",height: "120px",padding: "1rem",gap: "1rem",borderRadius: "0rem"}}>
            <section className={`flex flex-col align-center justify-center`} style={{width: "150px",padding: "0rem"}}>
                <Image src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${imgSrc}`} onErrorCapture={e => setImgSrc("/assets/noimage.webp")} alt="Auto" width={100} height={100}  style={{objectFit:"cover",borderRadius: "1rem",aspectRatio: '1',width: "100%",height: "100%"}}></Image>
            </section>
            <section style={{width:"80%"}} className={`${styles.CardCategoryText} flex flex-col align-start`} >
                <h3>{chat_name}</h3>
                <h4 className="small-text">{sender_name}</h4>
                <h5>{""}</h5>
            </section>
            <section className={`${styles.CardRowPrice} flex flex-col align-center justify-center`} style={{border: "none"}}>
                {time}
            </section>
        </article>
    )
}