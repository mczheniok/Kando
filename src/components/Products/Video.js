"use client"
import styles from "./sectionsProducts.module.css"




export default function VideoSection({VideoId}) {  
  
  return ( 
      <section id="video" className={`${styles.SectionVideo} flex flex-col align-center justify-center`}>
        <iframe className={styles.VideoBlock} src={`https://www.youtube.com/embed/${VideoId}`} title="YouTube video player" frameBorder={"0"} allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"} referrerPolicy={"strict-origin-when-cross-origin"} allowFullScreen></iframe>
      </section>
    )
  }