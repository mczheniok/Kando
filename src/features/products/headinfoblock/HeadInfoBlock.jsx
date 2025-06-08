import styles from "./headinfoblock.module.css";


export const HeadInfoBlock = () => {
    return (
        <div className="flex flex-col align-center" style={{width: "100%",height: "fit-content"}}>
            <div className={styles.textSwitchContainer}>
                <h1 className={styles.mainTitle}>Наша платформа Kando накраще місце для</h1>
                <div className={styles.phraseContainer}>
                    <div className={styles.phrasesWrapper}>
                      <h1 className={styles.gradientText}>Вашого Бізнесу</h1>
                      <h1 className={styles.gradientText}>Вашого Стартапу</h1>
                      <h1 className={styles.gradientText}>Вашого Магазину</h1>
                      <h1 className={styles.gradientText}>Та просто для створення оголошень</h1>
                      {/* Копируем первую фразу для бесшовной анимации */}
                      <h1 className={styles.gradientText}>Вашого Бізнесу</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}