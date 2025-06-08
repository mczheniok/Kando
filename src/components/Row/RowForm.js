import styles from "./row.module.css"

export default function RowBlock(props) {
    return  (
        <form className={`${styles.RowBlock} flex flex-row align-center flex-wrap ${props.className}`}> 
            {props.children}
        </form>
    )
}