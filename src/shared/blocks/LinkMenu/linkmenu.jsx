"use client";

import styles from "./menu.module.css"
import { useState } from "react";
import { 
    SubCategory,
    CategoryList,
    subCategoryUrl
} from "@/config";

import { LinkStyled } from "@/shared/link/link";

export function LinkMenu ({style = "dropList"}) {
    const [selectedCategory,setSelectedCategory] = useState(0);
   
    const handleCategoryClick = ind => setSelectedCategory(ind);

    const srcSubcategoryArr = Object.values(subCategoryUrl)[selectedCategory];
    const srcSubcategoryKeys = Object.keys(subCategoryUrl)[selectedCategory];
    
    return (
        <div className={`${styles[style]} flex flex-row`} style={{maxHeight: "400px",overflowX: "hidden"}}>
            <ul className={`flex flex-col align-start justify-around`} style={{width: "20%",borderRight: "solid var(--border) 1px"}}>
                {CategoryList.map((el,ind) => {
                    return (
                        <li style={{width: "100%",height: "100%",cursor: "pointer"}} className="flex flex-row align-center justify-start ul-cont" onClick={() => handleCategoryClick(ind)} key={`category-el-${ind}`}>
                            <p className="h3-text">{el}</p>
                        </li>
                    )
                })}
            </ul>
            <ul className="flex flex-col align-start justify-around" style={{width: "80%",overflowY: "auto",overflowX: "hidden",padding: "0rem 1rem"}}>
                {srcSubcategoryArr.map((el,ind) => {
                    const uaText = SubCategory[CategoryList[selectedCategory]][ind];
                    const url = `/${srcSubcategoryKeys}/${el}`;

                    return (
                        <li key={`link-category-${ind}`} className="flex-grow" style={{width: "100%"}}>
                            <LinkStyled el={uaText} url={url}/>
                        </li>
                    )            
                })}
            </ul>
        </div>   
    )     
}