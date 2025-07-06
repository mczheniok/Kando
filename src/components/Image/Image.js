"use client"
import { useState , useEffect } from "react"
import styles from "./image.module.css"
import Image from "next/image"
import { SkeletonWithShimmer , SkeletonCircleWithShimmer } from "@/shared/information/skeleton"
import { ButtonWithIcon } from "@/shared/Buttons/Buttons"
import { toServer } from "@/features/functions/functions"
import { ShowPopup } from "@/features/products/popup/showpopup"

import MessagesIcon from "@/icons/messages.svg";
import ReserverIcon from "@/icons/reserve.svg";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export function ProductImageSection({list}) {
  const [ImageSrc, setImageSrc] = useState(list[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClickImage = _ => setOpen(!open);

  return (
    <>
      <section className={`${styles.ImageSection} flex flex-col`}>
        <div style={{width: "100%", objectFit: "contain", height: "82%", position: "relative"}}>
          <Image src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${ImageSrc}`} onClick={handleClickImage} priority={true} alt="Product Image" fill style={{objectFit: "contain"}} />
        </div>
      </section>
      
      <section style={{
        top: "0", left: "0", position: "fixed", visibility: `${open ? "visible" : "hidden"}`,
        width: "100vw", zIndex: "10001", background: "rgba(1,1,1,0.5)", height: "100vh"
      }}>
        <button onClick={handleClickImage} style={{
          position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.8)",
          border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "24px",
          cursor: "pointer", zIndex: "10003"
        }}>×</button>

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
                  src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${image}`}
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
    </>
  );
}




  export function UserHeaderInfo({
    username,
    email,
    image = "/assets/noimage.webp",
    subscription = "pro",
    product_id,
    userId,
    anoncement = false
  }) {

  const [popupdata,setPopUpData] = useState({
    show: false,
    title: "Забронювати оголошення"
  });
    

  const handleChatClick = async () => {
    console.log(true);

    const createChat = await toServer(`/chat/chat`,{
      method: "POST",
      headers: {   
        "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`,
        "Content-Type":"application/json" 
      },
      body: JSON.stringify({
        product_id,
        to_user_id: userId
      })
  })

    if(createChat.data?.status === "ok") {
      localStorage.setItem("chat",JSON.stringify({
        new_chat: true
      }))
      window.location.href = `/account`;
    }
  }
  
  const handleReserveClick = () => {
    setPopUpData(prev => ({
      ...prev,
      show: !prev.show
    }))
  }

  

  const UserAvatar = ({width,height,padding=null}) => {
    const [img,setImg] = useState(image);
    
    return (
      <img loading="lazy" width={width} height={height} src={img} onError={() => setImg("/assets/noimage.webp")} style={{padding: padding?padding:"7px"}} className={`${styles.circleImage} circle`} alt="User Avatar"></img>
    )
  }
  return (
      <article className={`${styles.userInfo} flex flex-row`} style={{padding: "1rem",background: "var(--bg-card)"}}>
        <UserAvatar width={"100vw"} height={"100vh"}></UserAvatar>
          <div className="flex flex-col">
            {username?
            <>
              <h2>{username}</h2>
              <h3>{subscription}</h3>
              <h4 className="secondary-text">{email}</h4>
              <div className="flex flex-row">
                {product_id && (
                   <ButtonWithIcon Icon={MessagesIcon} title={"Написати"} clName={"justify-around flex-grow"} click={handleChatClick}></ButtonWithIcon>
                )}
                {anoncement?.subcategory === "daily" && (
                  <ButtonWithIcon Icon={ReserverIcon} title={"Резерв"}  clName={"justify-around flex-grow"} click={handleReserveClick}></ButtonWithIcon>
                )}
              </div>
            </>
            :
            <>
              <SkeletonWithShimmer w={100}></SkeletonWithShimmer>
              <SkeletonWithShimmer w={120}></SkeletonWithShimmer>
              <SkeletonWithShimmer w={160}></SkeletonWithShimmer>
              <SkeletonWithShimmer w={200}></SkeletonWithShimmer>
            </>
            }
            {anoncement.subcategory === "daily" && (
              <ShowPopup  popupdata={{...popupdata,data: {product_id,to_user_id: userId}}}></ShowPopup>
            )}
          </div>
      </article>
  )
} 

export const CircleImage = ({width,height,src}) => {
  src.length > 10?<Image src={src} className={`${styles.ReviewsLogo} circle`} alt={"Circle Image"} width={width} height={height}></Image>
  :<SkeletonCircleWithShimmer></SkeletonCircleWithShimmer>
}



export const CardImage = ({width,height,src}) => <Image src={src} className={styles.ProductImage} alt={"Product Image"} width={width} height={height}></Image>

export const CardPreview = ({image}) => {
  const [img,setImg] = useState(`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${image}`);

  return <Image quality={60} width={240} height={240} src={img} onError={() => setImg("/assets/noimage.webp")} alt="Preview Image" className={styles.ProductPreviewImage}></Image>
}