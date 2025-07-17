"use client"

import { useEffect, useState } from "react"
import styles from "./buttons.module.css"
import Image from "next/image"
import Link from "next/link"

export function ButtonWithIcon({
            clName=null,
            relative=true,
            title,
            Icon,
            click,
            children=null,
            style="",
            submit=false,
            ariaLabel = "Кнопка",
            ariaDescribedBy,
            id,
            disabled = false,
        }) {       
        return (
            <button 
                    id={id} 
                    type={submit ? "submit" : "button"} 
                    style={{position: relative?"relative":''}} 
                    disabled={disabled}
                    aria-label={ariaLabel || title} 
                    aria-describedby={ariaDescribedBy}
                    aria-disabled={disabled}
                    className={`${styles.ButtonWithIcon} true flex flex-row align-center ${clName || ""} ${disabled ? styles.disabled : ''}  ${style?styles[style]:''}`} 
                    onClick={e =>  click && click(e)}
                >
                {Icon && ( 
                    <Icon aria-hidden="true" focusable="false" width={33} height={33} />
                )}
                {title && (
                    <span 
                        className={`${style?styles[style+"Text"]:''} h4-text`} 
                        style={{width: "50%",
                        textAlign: "center"}}
                        aria-hidden={ariaLabel ? "true" : "false"}
                    >
                        {title}
                    </span>
                )}
                {children}
            </button>
        )
    }

export function ButtonMiniIcon({title,Icon,click}) {
    return (
        <button data-icon={Boolean(Icon) ? "true" : ""} type="button" className={`${styles.ButtonWithIcon} flex flex-row align-center`} onClick={e =>  click && click(e)}>
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



export function Ref({title,link,style,clName = ""}) {
    return (
        <Link                 
            href={link}
            className={`${styles.button} flex flex-row ${clName} align-center ${styles[style]}`} 
            
        >
            {title && (
                <span className={`${style?styles[style+"Text"]:''} flex-grow h4-text`} style={{width: "50%",textAlign: "center"}}>{title}</span>
            )}
        </Link>
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

export function ButtonLazyDropList({title,Icon,relative=true,style,clName,click,children,name}) {
    const [status,setStatus] = useState(false);
    const [lazyList,setLazyList] = useState([[]]);
    const [loaded,setLoaded] = useState(false)
    
    const fun = () => setStatus(p => !p);

    useEffect(() => {
        if (status && !loaded) {
            import("../../config")
            .then((mod) => {
                const md = mod[name];
                
                setLazyList(md);
                setLoaded(true);
            })
            .catch(err => {
                console.error('Failed to load SubCategory:', err);
            }); 
        }
    }, [status, loaded]);

    return (
        <ButtonWithIcon submit={false} title={title} relative={relative} clName={clName} style={style} Icon={Icon} click={click || fun}>
            {status && typeof children === 'function' && children(lazyList)}
            {status && typeof children !== 'function' && children}
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

export function Button({ariaLabel,disabled = false,title,style=false,submit=false,clName,click = () => {},children}) {
    return (
        <button 
            aria-label={ariaLabel}
            disabled={disabled}
            style={{width: "100%"}} 
            type={submit?"submit":"button"} 
            className={`${styles.button} flex flex-row align-center ${clName || ""} ${disabled ? styles.disabled : ''} ${styles[style]}`} 
            onClick={e =>  click && click(e)}
        >
            {title && (
                <span className={`${style?styles[style+"Text"]:''} h4-text`} style={{width: "50%",textAlign: "center"}}>{title}</span>
            )}
            {children}
        </button>
    )
}