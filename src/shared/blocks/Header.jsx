"use client"
import styles from "./blocks.module.css";
import { Button, ButtonWithList, RefWithIcon } from "@/shared/Buttons/Buttons";
import Logo from "./Logo";
import { LanguageContenxt } from "@/components/Containers/container";
import { useContext } from "react";
import LanguageIcon from "@/icons/language.svg"
import UserIcon from "@/icons/user.svg"

function Header() {
    const { language , set } = useContext(LanguageContenxt);
    

    const handleChangeLang = (e) => { 
        const lang = e.target.getAttribute("data-lang");
        set(lang);
        localStorage.setItem("language",JSON.stringify(lang));
    }

    return ( 
        <header className={`${styles.header} flex flex-row align-center`}>
            <div className="container flex flex-row align-center justify-between">
                <Logo size={`${styles.logo}`} type={true}></Logo>
                <nav className={`${styles.navContainer} flex flex-row align-center`}>
                    <Button title={"тема"}  click={() => {
                        const html = document.documentElement;
                        const current  = html.getAttribute("data-theme");
                        html.setAttribute("data-theme",current === "dark"? "light" : "dark");
                    }}></Button>
                    <RefWithIcon link={"/account"} Icon={UserIcon} title={language.i}></RefWithIcon>    
                    <ButtonWithList Icon={LanguageIcon} title={language.language}>
                        <ul className="flex flex-col align-center" style={{position: "absolute",width: "100%",top:'110%',borderRadius: "0rem 0rem 1rem 1rem",left: "0",gap: ".5rem",zIndex: "100",background: "var(--bg-glass)",border: "solid var(--border) 1px",minHeight:"fit-content"}}>
                            <li><h3 data-lang="en" onClick={handleChangeLang}>Eng</h3></li>
                            <li><h3 data-lang="ua" onClick={handleChangeLang}>Укр</h3></li>
                        </ul>
                    </ButtonWithList>
                </nav>     
            </div>  
        </header>
    )    
};

export default Header; 