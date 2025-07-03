import Link from "next/link"
import styles from "./blocks.module.css" 


export default function Footer() {
    
    const list = [
        {
            url: "/" , text: "Головна"
        },
        {
            url: "/about" , text: "Про нас"
        },
        {
            url: "/account" , text: "Акаунт"
        },
        {
            url: "/termofuse" , text: "Політика Користування"
        }
    ]


    return (
        <footer id={styles.footer}>
            <nav className="container flex flex-row align-center flex-wrap" style={{padding: "2rem 0px"}}>
                <ul className="flex flex-col">
                    <h2>Посилання</h2>
                    {list.map((el,ind) => {
                        return <li key={`info-el-${ind}-1`}><Link href={el.url}>{el.text}</Link></li>
                    })}
                </ul>
            </nav>
        </footer>
    )
}