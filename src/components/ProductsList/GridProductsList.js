"use client";

import styles from "./products.module.css"
import { Card } from "../Cards/Card"
import { useEffect , useRef, useState } from "react";
import { Pagination } from "@/shared/blocks/pagination";
import Loading from "../loader";


export default function GridProductsList({items=[],set,count=1}) {
    const [paginationPage,setPaginationPage] = useState(1);  
    const containerRef = useRef();

    useEffect(() => { // NEED DELETE THIS TO 100 PERFOMANCE ; 
      const targets = containerRef.current.querySelectorAll("a");

      targets.forEach((el) => {
        el.style.opacity = "0";
      });
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const ITEM_PER_ROW = 4;
            const DELAY_TIME = 0.1
            const index = Array.from(targets).indexOf(entry.target);
            const row = index % ITEM_PER_ROW;
            const delay = row * DELAY_TIME;

            if (entry.isIntersecting) {
              entry.target.style.transition = `opacity .3s ease ${delay}s`;
              entry.target.style.opacity = "1";
            } else {
              entry.target.style.transition = `opacity 0.1s ease ${delay}s`;
              entry.target.style.opacity = "0";
            }
          });
        },
        { threshold: 0.3 }
      );
      
  
      targets.forEach((el) => observer.observe(el));
  
      return () => {
        targets.forEach((el) => observer.unobserve(el));
      };
    },[items])

    return (
      <div className="flex flex-col" style={{gap: "0rem",padding: '1rem'}}>
          <div ref={containerRef} className={styles.GridProductsList}>
            {items.length > 0?
             items?.map((el,ind) => {
              return <Card type={"grid"} obj={el} key={`products-list-el-${ind}`}></Card>
            }):<Loading />
            }
          </div>
          <Pagination pages={count} state={[paginationPage,setPaginationPage]} set={set}></Pagination>
      </div>
    )
}