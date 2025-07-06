import Image from "next/image";
import Link from "next/link";
import styles from "./cards.module.css"
import { ButtonCircle, ButtonWithIcon } from "@/shared/Buttons/Buttons";
import { ButtonShare } from "@/features/client/client";
import { categoryCONST } from "@/config"
import { CardPreview } from "../Image/Image";
import { toServer } from "@/features/functions/functions";
import { useState } from "react";
import HeartIcon from "@/icons/heart.svg";
import ViewsIcon from "@/icons/view.svg";
import TrashIcon from "@/icons/trash.svg";
import ArchiveIcon from "@/icons/archive.svg";
import HistoryIcon from "@/icons/history.svg";
import { deleteFromCache } from "../../shared/db/indexedDB";

const nameLen = (name,len,size) => name?.length > len?name.slice(0,size) + "...": name;


function CardCategory({src,text}) {
    return <h4 className="tw-secondary-text">{nameLen(text,25,25)}</h4>
}

export function Card({obj,type}) {
    const { views , name , category ,subcategory , previewimage, street } = obj;

    return( 
        <Link href={`/product/${obj.id}`} className={`${type === "grid"?styles.Product:styles.RowProduct} flex flex-col`} >
            <div className={`${styles.CardHead}`}>
                <CardPreview image={previewimage}></CardPreview>
                <p className={styles.CardHeadImportant}>-35%</p>
            </div>
            <div className={`${styles.CardFooter} flex flex-col`}>
                <h5 className={styles.CardCategoryText}>{obj.type || "Нерухомість"} / {subcategory} / {street || "вулицю не вказано"}</h5>
                <h3>{nameLen(name|| "Прототип",20,15)}</h3>
                <div className="flex flex-row align-center" style={{height: "40px"}}>
                    <ViewsIcon width={25} height={25}></ViewsIcon>
                    <CardCategory text={views}></CardCategory>
                    {category?.map((el,ind) =>{ 
                        return <CardCategory key={`category-el-${ind}`} text={el}></CardCategory>
                    })}
                </div>

                <div className={`${styles.CardInfo} flex flex-row align-baseline`}>
                    <h2>{obj?.price}</h2>
                </div>  
                <div className="flex flex-row align-center">
                    <ButtonShare></ButtonShare>
                    <ButtonWithIcon Icon={HeartIcon}  clName={"flex-grow justify-around"} style="dark" title={"В Обрані"}></ButtonWithIcon>
                </div>
            </div>
        </Link>
    )
}


export function CardBlock({Icon,title,notifications,click}){
    return (
        <div onClick={() => click && click()} className={`${styles.Card} flex flex-row align-center flex-wrap`}>
            <Icon width={40} height={40} />   
            <span className="flex flex-col">
                <h3>{title}</h3>
                <h3 className="accent-text circle" style={{width: "25px",textAlign:"center",height: "25px",lineHeight: "25px",padding: ".5rem",boxSizing: "content-box",border: "solid var(--orange) 2px"}}>{notifications}</h3>
            </span>
        </div>
    )
}

export function CardBlockPicture({title,text,img,src}){
    return (
        <div className={`${styles.Card} flex flex-row align-center flex-wrap`} >
            <picture className="flex flex-row align-center justify-center" >
                <source srcSet={src} type="image/webp" />
                <img src={img} alt="🚀" width="45" height="45" />
                <h3 >{title}</h3>
            </picture>
            <span className="flex flex-col">
                <p style={{color: '#555555'}}>{text}</p>
            </span>
        </div>
    )
}


export function CardRow({obj,t=false}) {
    const {name,id,price,type,views,category,created_at,previewimage} = obj;
    const [imgSrc,setImgSrc] = useState(previewimage || "/assets/noimage.webp");

    const handleClickDeleteButton = async e => {
        toServer(`/${!t?"archive":"account"}/delete/${id}`,{
            method: "DELETE",
            headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` }
        })
        .then(() => {
            document.querySelector(`[data-product-id="${id}"]`).remove()
            deleteFromCache(`/${!t?"archive":"account"}/delete/${id}`);
        })
        
    }

    const handleArchiveButton = () => {
        toServer(`/${!t?"archive":"account"}/add/${id}`,{
            method: "PUT",
            headers: {  
                "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`,
                "Contant-Type": "application/json"
            }
        })   
    }

    return( 
        <article className={`${styles.CardRow} flex flex-row `} data-product-id={id}>
            <section className={styles.CardRowImage}>
                <Image src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${imgSrc}`} onErrorCapture={e => setImgSrc("/assets/noimage.webp")} alt="Auto" width={200} height={200}  style={{borderRadius: ".5rem 0rem 0rem .5rem",objectFit:"cover",width: "100%",height: "100%"}}></Image>
            </section>
            <section style={{height: "100%"}} className={`${styles.CardRowDescription} flex flex-col justify-between`}>
                <div className="flex flex-row">
                    <h3>{name}</h3>
                </div>
                <div className="flex flex-col">
                    <h5 className={styles.CardCategoryText}>{categoryCONST[type]} </h5>
                    <div className="flex flex-row">
                        <CardCategory src={"floorwidth"} text={"22m2"}></CardCategory>
                        <CardCategory src={"view"} text={views}></CardCategory>
                    </div>
                </div>
            </section>
            <section className={`${styles.CardRowPrice} flex flex-col align-end justify-between`}>
                <span className="flex flex-row align-baseline">
                    <h3>{price}</h3>
                    <h4 className="through-text">{obj.LastPrice || "22.000,00"}</h4>
                </span>
                <div className="flex flex-col align-end"  style={{width: "100%",height: "fit-content",gap: ".5rem"}}>
                    <h5>створенно: {new Date(created_at).toLocaleDateString()}</h5>
                    <div className="flex flex-row">
                        <ButtonCircle color="red" click={handleClickDeleteButton} Icon={TrashIcon}></ButtonCircle>
                        <ButtonCircle color="orange" title={t?"Добавити в архів":"Повернути до оголошень"} click={handleArchiveButton} Icon={t?ArchiveIcon:HistoryIcon}></ButtonCircle>
                    </div>    
                </div>
            </section>
        </article>
    )
}

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