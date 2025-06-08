import Link from "next/link"
import styles from "./blocks.module.css" 


export default function Footer() {
    
    const list = [
        {
            url: "/" , text: "Головна"
        },
        {
            url: "/" , text: "Про нас"
        },
        {
            url: "/" , text: "Акаунт"
        },
        {
            url: "/" , text: "Корзина"
        }
    ]

    const paymentsList = [
        "mastercard","visa","UnionPay","AmericanExpress"
    ]

    return (
        <footer id={styles.footer}>
            <nav className="container flex flex-row align-center justify-around flex-wrap" style={{padding: "2rem 0px"}}>
                <ul className="flex flex-col ">
                    <h2>Посилання</h2>
                    {list.map((el,ind) => {
                        return <li key={`info-el-${ind}-1`}><Link href={el.url}>{el.text}</Link></li>
                    })}
                </ul>
                <ul className="flex flex-col ">
                    <h2>Оплата</h2>
                    {paymentsList.map((el,ind) => {
                        return <li key={`info-el-${ind}-2`}><h3>{el}</h3></li>
                    })}
                </ul>
            </nav>
        </footer>
    )
}