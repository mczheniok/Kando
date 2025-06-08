"use client"
import { Language } from "@/config";
import styles from "./container.module.css"
import { createContext, useState , useEffect, useMemo} from "react"


export const LanguageContenxt = createContext(Language.ua);

export function MainContainer({children}) {
    return (
        <main style={{minHeight: '400px',padding: "0rem"}} className="container flex flex-col">
            {children}
        </main>
    )
}

export function InfoContainer({children = null}){
    return (
        <section className={styles.InfoContainer}>
            {children && (children)}
        </section>
    )
}


export function ContainerLanguage({children}) {
    const [language, setLanguage] = useState("ua");
  
    useEffect(() => {
      try{
        const storedLang = localStorage.getItem("language");
        
        if (storedLang) {
          setLanguage(JSON.parse(storedLang));
        }
      } catch(err) {
        console.log(err);
      }
    },[]);

    const contextValue = useMemo(() => ({
      language: Language[language],
      set: setLanguage
    }),[language]);

    return (
        <LanguageContenxt.Provider value={contextValue}>
            {children}
        </LanguageContenxt.Provider>
    )
}