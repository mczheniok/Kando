"use client"
import styles from "./fremes.module.css"
import Image from "next/image"



export function AnimatedBlock() {
    return (
        <div className={`${styles.AnimatedBlock} flex flex-row align-center justify-center`}>
      </div>
    )
}


export function AnimatedRow() {
    const images = [
        "github", "google", "github", "google", "github", "google", "github", "google",
        "github","google","github","google"
    ];

    return (
        <section className={`${styles.AnimatedRowContainer} flex flex-col align-center`}>
            <h1>Нам Довіряють</h1>
            <div className={`${styles.AnimatedRow}`}>
                {images.map((el, ind) => (
                    <Image
                        className={styles.RowLogos}
                        width={100}
                        alt="Logo Element"
                        height={100}
                        src={`/logos/${el}.png`}
                        key={`animated-row-el-${ind}`}
                    />
                ))}
                {images.map((el, ind) => (
                    <Image
                        className={styles.RowLogos}
                        width={100}
                        alt="Logo Element"
                        height={100}
                        src={`/logos/${el}.png`}
                        key={`animated-row-el-duplicate-${ind}`}
                    />
                ))}
            </div>
        </section>
    );
}

