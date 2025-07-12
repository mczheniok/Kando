import styles from "./link.module.css";
import Link from "next/link";



export function LinkStyled({el,url}) {
    return (
        <Link href={`${url}`} className={styles["category-item"]}>
            <p>{el}</p> 
        </Link>
    )
}

export function LinkText({el,ind}) {
    return (
        <h3 data-page-el={ind} className={styles["category-item"]}>
            {el} 
        </h3>
    )
}