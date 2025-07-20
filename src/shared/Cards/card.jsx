import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

import { parsePrice, sliceText } from "@/features/functions/functions";
import { Suspense } from "react";
import dynamic from "next/dynamic"; 
import ViewsIcon from "@/icons/view.svg";
 
const CardButtonContainer = dynamic(() => import("./CardButton").then(mod => ({default: mod.CardButtonContainer})));


export function CardPreview({ img, priority = false , alt = "Превью оголошення"}) {
    return (
        <div style={{minHeight: "250px"}}>
            <Image
                src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${img}` || '/assets/noimage.webp'}
                alt={alt}
                width={300}
                fetchPriority={priority ? "high" : "low"} // ✅ Дополнительный hint
                height={200}
                priority={priority}
                {...(!priority && { loading: "lazy" })}
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                    width: '100%',
                    objectFit: 'cover',
                    maxHeight: "240px"
                }}
            />
        </div>
    )
}


function CardCategory({src,text,label}) {
    return <h4 className="tw-secondary-text">{label} {sliceText(text,25)}</h4>
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
                    alt={sliceText(name,30)}
                />
            </div>
            <div className={`${styles.CardFooter} flex flex-col`}>
                <h4 className={styles.CardCategoryText}>{obj.type || "Нерухомість"} / {subcategory}</h4>
                <h3>{sliceText(name || "Прототип",60)}</h3>
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
                <Suspense fallback={<div style={{width: "100%"}}>кнопки дій для оголошення</div>}>
                    <CardButtonContainer id={obj.id} />
                </Suspense>
            </div>
        </Link>
    )
}