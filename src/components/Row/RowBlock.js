import styles from "./row.module.css"

export default function RowBlock(props) {
    return  (
        <section className={`${styles.RowBlock} flex flex-row align-center flex-wrap ${props.className}`} id={props.id}>  
            {props.children}
        </section>
    )
}