"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./product.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';



export function ProductImageSection({list,id}) {
  const [ImageSrc, setImageSrc] = useState(list[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickImage = _ => setOpen(!open);
  const handleGalleryClick = ind => {
    setCurrentIndex(ind);
    setImageSrc(list[ind]);
  }


  return (
    <div className="flex flex-col" style={{width: '100%'}}>
      <section className={`flex flex-col justify-center align-center ${styles.ProductImage}`} style={{minHeight: "300px"}}>
        <div className={`${styles.imageProductContainer} flex flex-row align-center justify-center`}>
          <Image src={`${process.env.NEXT_PUBLIC_URL}/images${ImageSrc}`} className="flex-grow" onClick={handleClickImage} priority={true} alt="Product Image" fill style={{objectFit: "contain"}} />
        </div>
      </section>
      <div className={`${styles.galleryContainer} flex flex-row align-start justify-start`}>
        {list.map((el,ind) => {
          return (
            <div key={`image-gallery-${ind}`} className={`${styles.imageGalleryContainer} flex flex-col align-center justify-center`}>
              <Image alt={`image in gallery ${ind}`} onClick={() => handleGalleryClick(ind)} width={35} height={35} style={{borderRadius: ".3rem",width: "35px",height: "35px"}} src={`${process.env.NEXT_PUBLIC_URL}/images${el}`}/>
            </div>
          )
        })}
      </div>
    

      <section style={{
        top: "0", left: "0", position: "fixed", visibility: `${open ? "visible" : "hidden"}`,
        width: "100vw", zIndex: "10001", background: "var(--secondary)", height: "100vh"
      }}>
        <button onClick={handleClickImage} style={{
          position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.8)",
          border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "1rem",
          cursor: "pointer", zIndex: "10003"
        }}>❌</button>

        <Swiper
          modules={[Navigation, Keyboard]}
          navigation={true}
          keyboard={true}
          initialSlide={currentIndex}
          onSlideChange={(swiper) => setImageSrc(list[swiper.activeIndex])}
          style={{width: "100%", height: "100%"}}
        >
          {list.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col align-center justify-center" style={{width: "100%", height: "100vh"}}>
                <Image 
                  src={`/assets/${image}`}
                  alt={`Product Image ${index + 1}`}
                  fill
                  style={{objectFit: "contain"}}
                  sizes="85vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}


export function ImageSection({images,id}) {    
    return (
      <ProductImageSection list={images} id={id}></ProductImageSection>  
    )
}