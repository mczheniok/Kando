import styles from "./link.module.css";
import Link from "next/link";



export function LinkStyled({el}) {
    return (
        <Link href={"/c/daily"} className={styles["category-item"]}>
            <h1>{el}</h1> 
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