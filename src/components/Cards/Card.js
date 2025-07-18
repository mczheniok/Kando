import Image from "next/image";
import Link from "next/link";
import styles from "./cards.module.css"
import { ButtonCircle, ButtonWithIcon } from "@/shared/Buttons/Buttons";
import { ButtonShare } from "@/features/client/client";
import { categoryCONST } from "@/config"
import { CardPreview } from "../Image/Image";
import { toServer , parsePrice } from "@/features/functions/functions";
import { useState } from "react";
import HeartIcon from "@/icons/heart.svg";
import ViewsIcon from "@/icons/view.svg";
import TrashIcon from "@/icons/trash.svg";
import ArchiveIcon from "@/icons/archive.svg";
import HistoryIcon from "@/icons/history.svg";
import EditIcon from "@/icons/edit.svg";

import { useRouter } from "next/navigation";


import { deleteFromCache } from "../../shared/db/indexedDB";

const nameLen = (name,len,size) => name?.length > len?name.slice(0,size) + "...": name;


function CardCategory({src,text,label}) {
    return <h4 className="tw-secondary-text">{label} {nameLen(text,25,25)}</h4>
}

export function Card({obj,type,priority,course}) {
    const { views , name , category ,subcategory , previewimage, street } = obj;

    return( 
        <Link href={`/product/${obj.id}`} className={`${type === "grid"?styles.Product:styles.RowProduct} flex flex-col card`} >
            <div className={`${styles.CardHead}`}>
                <CardPreview 
                    img={previewimage}
                    priority={priority}
                    loading={priority ? "eager": "lazy"}
                    alt={nameLen(name,20,60)}
                />
            </div>
            <div className={`${styles.CardFooter} flex flex-col`}>
                <h4 className={styles.CardCategoryText}>{obj.type || "Нерухомість"} / {subcategory}</h4>
                <h3>{nameLen(name|| "Прототип",20,60)}</h3>
                <div className="flex flex-row align-center" style={{height: "40px"}}>
                    <ViewsIcon width={25} height={25}></ViewsIcon>
                    <CardCategory text={views}></CardCategory>
                    {category?.map((el,ind) =>{ 
                        return <CardCategory key={`category-el-${ind}`} text={el}></CardCategory>
                    })}
                </div>

                <div className={`${styles.CardInfo} flex flex-row align-baseline`}>
                    <h2>{parsePrice(obj?.price,course)}</h2>
                </div>  
                <div className="flex flex-row align-center">
                    <ButtonShare id={obj.id}></ButtonShare>
                    <ButtonWithIcon Icon={HeartIcon}  clName={"flex-grow justify-around"} style="dark" title={"В Обрані"}></ButtonWithIcon>
                </div>
            </div>
        </Link>
    )
}


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
    const {name,id,price,type,views,created_at,previewimage,verified} = obj;
    const [imgSrc,setImgSrc] = useState(previewimage || "/assets/noimage.webp");

    const router = useRouter();


    const handleClickDeleteButton = async e => {
        toServer(`/${!t?"archive":"account"}/delete/${id}`,{
            method: "DELETE",
            headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
            credentials: "include"
        })
        .then(() => {
            document.querySelector(`[data-product-id="${id}"]`).remove()
            deleteFromCache(`/${!t?"archive":"account"}/delete/${id}`);
        })
        
    }

    const handleArchiveButton = () => {
        toServer(`/${t?"archive":"account"}/add/${id}`,{
            method: "PUT",
            headers: {  
                "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`,
                "Contant-Type": "application/json"
            },
            credentials: "include",
        })
    }

    const handleChangeClick = () => {
        router.push(`/account/edit?rel=${id}`);
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
                    <div className="flex flex-row justify-between">
                        {verified ? (
                             <CardCategory src={"view"} label={"Переглядів"} text={views}></CardCategory>
                        ) : <p className="h3-text">⚠️ На модерації {verified}</p> 
                        }
                        <h5 className="secondary-text">створенно: {new Date(created_at).toLocaleDateString()}</h5>
                    </div>
                </div>
            </section>
            
            <section className={`${styles.CardRowPrice} flex flex-col align-end justify-between`}>
                <div className="flex flex-row align-end justify-end"  style={{width: "100%",height: "fit-content",gap: ".5rem"}}>
                    <div className="flex flex-row align-center">
                        <ButtonCircle color="red" click={handleClickDeleteButton} Icon={TrashIcon}></ButtonCircle>
                        <ButtonCircle color="orange" title={t?"Добавити в архів":"Повернути до оголошень"} click={handleArchiveButton} Icon={t?ArchiveIcon:HistoryIcon}></ButtonCircle>
                        <ButtonCircle color="orange" title="Змінити" click={handleChangeClick} Icon={EditIcon}/>    
                    </div>    
                </div>
                <span className="flex flex-row align-baseline">
                    <h2>{price}</h2>
                </span>
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