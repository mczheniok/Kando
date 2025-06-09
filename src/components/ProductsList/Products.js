"use client"
import { useRef } from "react"
import { useToServer } from "@/shared/hooks/useToServer";
import { Card } from "../Cards/Card";
import Loader from "../loader";

export default function ProductsList({title,array}) {
    const [load,data] = useToServer(`/items/similar`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({similar: array})
    },false);
      

    const handleClick = e => {
        const left = container.current.querySelector("a").getBoundingClientRect().width

        container.current.scrollBy({left,behavior: "smooth"})
    }

    const container = useRef(null);

    return (
        <div className="flex flex-col" style={{margin: ".5rem 0px",padding:"1rem",borderTop: "solid var(--secondary) 3px"}}>
            <div className="flex flex-row justify-between">
                {title && (
                    <h2 style={{marginBottom: "1.5rem"}}>{title}</h2>
                )}    
                <div className="flex" onClick={e => handleClick(e)}>
                    <h3>дивитись ще</h3>
                    <h3 className="accent-text">⇒</h3>
                </div>
            </div>
            <div className="flex flex-row" ref={container} style={{overflowX:"auto",height: "430px"}}>
                {load?<Loader />:
                data?.items?.map((el,ind) => {
                    return <Card type={"row"} obj={el} key={`card-el-${ind}`}></Card>
                })}
            </div>
        </div>
    )
}