"use client"
import { useState } from "react"
import styles from "./image.module.css"
import Image from "next/image"
import { SkeletonWithShimmer , SkeletonCircleWithShimmer } from "@/shared/information/skeleton"
import { ButtonWithIcon } from "@/shared/Buttons/Buttons"
import { toServer } from "@/features/functions/functions"
import { ShowPopup } from "@/features/products/popup/showpopup"

import MessagesIcon from "@/icons/messages.svg";
import ReserverIcon from "@/icons/reserve.svg";

export function ProductImageSection({list}) {
    const [ImageSrc,setImageSrc] = useState(list[0]);
    const [open,setOpen] = useState(false);

    const handleclick = e => {
      const i = e.target.getAttribute("data-img-i");
      setImageSrc(list[i]);
      e.target.classList.add("active");
    }

    const handleClickImage = _ => setOpen(!open);
  
    return (
      <>
        <section className={`${styles.ImageSection} flex flex-col`}>
          <div style={{
            width: "100%",
            objectFit: "contain",
            height: "82%",
            position: "relative",
          }}>
          <Image src={`/uploads${ImageSrc}`} onClick={handleClickImage} priority={true} alt="Product Image" fill style={{objectFit: "contain"}}></Image>
          </div>
            <div className={`${styles.ImageLength} flex flex-row`} style={{overflowX: "auto",height: "18%"}}>
                {list.map((el,ind) => {
                    return <Image onClick={e => handleclick(e)} className={styles.LengthBlock} width={50} data-img-i={ind} height={50} quality={30} loading="lazy" alt="next image btn" src={`/uploads${el}`} key={`next-img-${ind}`}></Image>
                })}
            </div>
        </section>
        <section style={{
            top: "0",
            left: "0",
            position: "fixed",
            visibility: `${open?"visible":"hidden"}`,
            width: "100vw",
            zIndex: "10001",
            background: "rgba(1,1,1,0.5)",
            height: "100vh",
          }}
          className="flex flex-col align-center justify-center"
          >
            <Image src={`/uploads${ImageSrc}`} onClick={handleClickImage} 
            priority={false} alt="Product Image"  
            quality={100} 
            fill 
            style={{objectFit: "contain"}}
            sizes="100vw"
            ></Image>
          </section>
      </>
    )
  }

  export function UserHeaderInfo({
    username,
    email,
    image = "/assets/me.jpg",
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

  

  const UserAvatar = ({width,height,padding=null}) => <img  width={width} height={height} src={image} style={{padding: padding?padding:"7px"}} className={`${styles.circleImage} circle`} alt="User Avatar"></img>
  
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
