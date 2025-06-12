"use client"

import { useState } from "react"
import styles from "./buttons.module.css"
import Image from "next/image"
import Link from "next/link"

export function ButtonWithIcon({clName=null,relative=true,title,Icon,click,children=null,style="",submit=false}) {
    return (
        <button type={submit?"submit":"button"} style={{position: relative?"relative":''}} className={`${styles.ButtonWithIcon} flex flex-row align-center ${clName || ""} ${style?styles[style]:''}`} onClick={e =>  click && click(e)}>
            {Icon && ( 
                <Icon width={33} height={33} />
            )}
            {title && (
                <span className={`${style?styles[style+"Text"]:''} h4-text`} style={{width: "50%",textAlign: "center"}}>{title}</span>
            )}
            {children}
        </button>
    )
}

export function ButtonMiniIcon({title,Icon,click}) {
    return (
        <button type="button" className={`${styles.ButtonWithIcon} flex flex-row align-center`} onClick={e =>  click && click(e)}>
            {Icon && ( 
                <Image src={`/icons/${Icon}.svg`} alt={`${title} icon`}  width={30} height={30}></Image>
            )}
            {title && (
                <span style={{fontSize: "1rem",textWrap: "nowrap",width: "50%",textAlign: "center"}}>{title}</span>
            )}
            {children}
        </button>
    )
}

export function RefWithIcon({title,Icon,link,style}) {
    return (
        <Link href={link} className={`${styles.ButtonWithIcon} flex align-center ${style?styles[style]:''}`}>
            {Icon && (
                <Icon width={33} height={33} />    
            )}
            <span>{title}</span>
        </Link>
    )
} 


export function RefWithImg({title,Icon,link,style,alt,clName}) {
    return (
        <Link href={link} className={`${styles.ButtonWithIcon} flex align-center ${clName} ${style?styles[style]:''}`} style={{padding: "1.5rem 0rem"}}>
            {Icon && (
                <Image width={33} height={33} alt={`${alt} Image`} src={Icon} />    
            )}
            <span className={`${style?styles[style+"Text"]:''} h4-text`}>{title}</span>
        </Link>
    )
}


export function ButtonWithList({title,Icon,relative=true,children,style,clName,click}) {
    const [status,setStatus] = useState(false)

    const fun = () => setStatus(!status)

    return (
        <ButtonWithIcon submit={false} title={title} relative={relative} clName={clName} style={style} Icon={Icon} click={click || fun}>
            {status && children}
        </ButtonWithIcon>
    )
}

export function ButtonMini({title}) {
    return (
        <button className={styles.ButtonMini}>
            {title}
        </button>
    )
}

export function ButtonCircle({Icon,color="orange",title="none",clName,click=() => {},w=40,h=40}) {
    return (
        <button title={title || "кнопка"} type="button" style={{maxHeight: `${w}px`,maxWidth: `${h}px`,"--button-color": color}} data-color={color} onClick={e => click(e)} className={`${styles.ButtonCircle} ${clName} flex flex-col align-center justify-center`}>
            {Icon && (
                <Icon width={20} height={20} />
            )}
        </button>
    )
}

export function Button({title,style=false,submit=false,clName,click = () => {},children}) {
    return (
        <button style={{width: "100%"}} type={submit?"submit":"button"} className={`${styles.button} flex flex-row align-center ${clName || ""} 
            ${styles[style]}`} onClick={e =>  click && click(e)}>
            {title && (
                <span className={`${style?styles[style+"Text"]:''} h4-text`} style={{width: "50%",textAlign: "center"}}>{title}</span>
            )}
            {children}
        </button>
    )
}