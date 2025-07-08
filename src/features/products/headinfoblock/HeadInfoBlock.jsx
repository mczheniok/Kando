import styles from "./headinfoblock.module.css";


export const HeadInfoBlock = () => {
    return (
        <div className="flex flex-col align-center" style={{width: "100%",height: "fit-content"}}>
            <div className={styles.textSwitchContainer}>
                <h1 className={styles.mainTitle}>Чому вам сподобається на Kando?</h1>
                <div className={styles.phraseContainer}>
                    <div className={styles.phrasesWrapper}>
                      <h1 className={styles.gradientText}>бо швидко</h1>
                      <h1 className={styles.gradientText}>та зручно</h1>
                      <h1 className={styles.gradientText}>ще й безкоштовно</h1>
                      <h1 className={styles.gradientText}>та створено для людей</h1>
                      <h1 className={styles.gradientText}>бо швидко</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}