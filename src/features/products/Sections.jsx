import styles from "./sections.module.css";
import { Fragment } from "react";
import LocalFont from "next/font/local";
import { RefWithIcon } from "@/shared/Buttons/Buttons";



const pacifico =  LocalFont({
    src: "../../../public/fonts/pacifico.ttf",
    style: "latin",
    weight: "400"
})

    export function InfoSectionBottom({text}) {
        const FormatedText = ({text}) => {
            return text.split("\n").map((line,index) => {
                return (
                <Fragment key={`info-line-${index}`}>
                    {line}
                    <br />
                </Fragment>
                )
        })}

    return (
        <section className={`${styles.grid2}`} id="description">
            <div className={`${styles.BlockIn} flex flex-col`} >
                <h1 className="accent-text">Опис</h1>
                <h3>
                    <FormatedText text={text}></FormatedText>
                </h3>
            </div>
            <div className={`${styles.BlockIn} flex flex-col align-center justify-center`}>
                <span style={{margin: "2rem 0rem",transform: "rotate(360deg)",writingMode: "vertical-rl"}}>тут могла бути ваша реклама</span>
            </div>
        </section>
    )
}



export const HeadMainPage = () => {
    return (
      <section
        className={`${styles.HeroContainer} flex flex-row`}
        style={{
          width: "100%",
          padding: "1rem",
          height: "fit-content"
        }}
      >
        <div
          className="flex flex-col align-start justify-between"
          style={{
            background: "var(--bg-glass)",
            backdropFilter: "blur(8px)",
            marginTop: "5rem",
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "600px",
            padding: "2rem",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            color: "#fff"
          }}
        >
          <div className="flex flex-col flex-wrap">
            <h1 className={styles.HeroTitle}>
              Створюй разом з {" "}
              <span
                className={pacifico.className}
                style={{
                  color: "var(--orange)",
                  fontWeight: 400
                }}
              >
                Kando
              </span>
            </h1>
            <p
              className={styles.HeroSecondaryText}
              style={{ marginTop: "1rem", fontSize: "1.2rem", lineHeight: "1.6" }}
            >
              Kando — місце, де ви можете знайти все: від товарів до послуг, від продажу до оренди. Створюйте оголошення легко та швидко!
            </p>
          </div>
          <RefWithIcon style={"dark"} link={"/account"}  title={"Почати"} />
        </div>
      </section>
    );
  };
  
