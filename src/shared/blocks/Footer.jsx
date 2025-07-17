import Link from "next/link"
import styles from "./blocks.module.css" 

import { CategoryList } from "@/config";

import Logo from "./Logo";
import TelegramIcon from "@/icons/telegram.svg";
import InstagramIcon from "@/icons/instagram.svg";

import PhoneIcon from "@/icons/phone.svg";
import LetterIcon from "@/icons/letter.svg";


function SocialLink({el}) {
    return (
        <Link href={el.url} passHref legacyBehavior>
            <a target={"_blank"} rel="noopener noreferrer">
                {el.icon}
            </a>
        </Link>
    )
}


export default function Footer() {
    
    const list = [
        {
            url: "/about" , text: "Про нас"
        },
        {
            url: "/support" , text: "Підтримка"
        },
        {
            url: "/termofuse" , text: "Політика Користування"
        },
        {
            url: "/safety" , text: "Політика Конфідеційності"
        }
    ]

    const SocialLinks = [   
        {
            url: "https://t.me/KandoInc", icon: <TelegramIcon /> 
        },
        {
            url: "/", icon: <InstagramIcon />
        }
    ]

    return (
        <footer id={styles.footer}>
            <nav 
                aria-label="Основні посилання сайту" 
                itemScope
                itemType="https://schema.org/SiteNavigationElement"
                className="container" 
                style={{padding: "2rem 0px",borderBottom: "solid var(--border) 1px"}}    
            >
                <div className="flex flex-col">
                    <Logo size={"h1-text"} type={false}/>

                    <p className="h6-text" style={{fontSize: "1rem",color: "var(--background)",fontWeight: "400"}}>
                        Продавайте речі, знаходьте вигідні пропозиції, спілкуйтеся напряму з іншими користувачами — усе це безпосередньо на Kando.
                    </p>

                    <div className="flex flex-row align-center">
                        {SocialLinks.map((el,ind) => {
                            return (
                                <SocialLink el={el} key={`social-link-${ind}`}/>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h3>Категорії</h3>

                    <ul className="flex flex-col">
                        {CategoryList.slice(0,4).map((el) => {
                            return (
                                <li key={el} itemProp="name">
                                    <Link href={el} itemProp="url">
                                        {el}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="flex flex-col">
                    <h3>Інформація</h3>
                    <ul className="flex flex-col">
                        {list.map((el) => {
                            return (
                                <li key={el.url} itemProp="name">
                                    <Link href={el.url} itemProp="url">
                                        {el.text}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="flex flex-col">
                    <h3>Контакти</h3>
                    
                    <ul className="flex flex-col">
                        <li className="flex flex-row align-center" style={{gap: "3px"}}>
                            <PhoneIcon width="16" height="16"></PhoneIcon>
                            <p style={{color: "var(--background)"}}>+380 67 582 22 24</p>
                        </li>
                        <li className="flex flex-row align-center" style={{gap: "3px"}}>
                            <PhoneIcon width="16" height="16"></PhoneIcon>
                            <p style={{color: "var(--background)"}}>+380 68 127 77 70</p>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="flex flex-row align-center justify-center flex-grow" style={{minHeight: "100px"}}>
                <p className="h3-text" style={{color: "var(--background)"}}>© 2025 Kando. Всі права захищені.</p>
            </div>
        </footer>
    )
}