"use client";

import { useState } from "react";
import Image from "next/image";


export const UserAvatar = ({width,height,padding=null,image}) => {
    const [img,setImg] = useState(`${image}`);
    
    return (
      <Image loading="lazy" width={width} height={height} src={img} onError={() => setImg("/assets/noimage.webp")} 
        style={{padding: padding?padding:"7px",border: "solid var(--border) 3px",background: "var(--border)"}} 
        className={`circle`} alt="User Avatar" 
      />
    )
}