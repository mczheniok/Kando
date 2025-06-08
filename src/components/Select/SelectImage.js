"use client"
import { useCallback } from "react"
import styles from "./select.module.css"
import Image from "next/image"

export default function SelectImage({list=null}) {
    const handleClick = useCallback((ind) => {
        document.querySelector(`[data-img-id="img-el-${ind}"]`).scrollIntoView(false)
    })

    return (
        <div className={styles.SelectList}>
            {list?.map((el,ind) => {
                return <Image className={styles.ImageInPick} onClick={() => handleClick(ind)} width={50} height={50} alt="next image btn" src={el} key={`next-img-${ind}`}></Image>
            })}
            {list?.map((el,ind) => {
                return <Image className={styles.ImageInPick} onClick={() => handleClick(ind)} width={50} height={50} alt="next image btn" src={el} key={`next-img-${ind}`}></Image>
            })}
            {list?.map((el,ind) => {
                return <Image className={styles.ImageInPick} onClick={() => handleClick(ind)} width={50} height={50} alt="next image btn" src={el} key={`next-img-${ind}`}></Image>
            })}
            {list?.map((el,ind) => {
                return <Image className={styles.ImageInPick} onClick={() => handleClick(ind)} width={50} height={50} alt="next image btn" src={el} key={`next-img-${ind}`}></Image>
            })}
            {list?.map((el,ind) => {
                return <Image className={styles.ImageInPick} onClick={() => handleClick(ind)} width={50} height={50} alt="next image btn" src={el} key={`next-img-${ind}`}></Image>
            })}
        </div>
    )
}
