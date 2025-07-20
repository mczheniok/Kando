"use client";

import styles from "./cardRow.module.css"
import { useState } from "react";
import { sliceText, toServer } from "@/features/functions/functions";
import { useRouter } from "next/navigation"
import Image from "next/image"
import { categoryCONST } from "@/config";
import { ButtonCircle } from "@/shared/Buttons/Buttons";
import TrashIcon from "@/icons/trash.svg";
import ArchiveIcon from "@/icons/archive.svg";
import HistoryIcon from "@/icons/history.svg";
import EditIcon from "@/icons/edit.svg";

import { deleteFromCache } from "@/shared/db/indexedDB";

function CardCategory({src,text,label}) {
    return <h4 className="tw-secondary-text">{label} {sliceText(text,25)}</h4>
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
        <article onDoubleClick={() => {
            router.push(`/product/${id}`)
        }} className={`${styles.CardRow} flex flex-row `} data-product-id={id}>
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