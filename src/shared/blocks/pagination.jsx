import { useRef , useEffect } from "react";
import styles from "./blocks.module.css";

function PageText({text,id,set}) {
    return <h1 onClick={() => set(id)} data-id={id} className={`flex flex-col align-center justify-center ${styles.PaginationPages}`}>{text}</h1>
}


const LoopForPage = (length,set) => {
    const el = []
    for(let i = 0; i < length; i++) {
        el.push(<PageText key={`pagination-page-el-${i}`} text={i} id={i+1} set={set}></PageText>)
    }
    return el
}


export function Pagination({pages,state,set=() => {}}) {
    const containerRef = useRef(null);
    const [page,setPage] = state;

    useEffect(() => {
        const ref = containerRef.current;
  
        ref.querySelectorAll(".select").forEach(el => {
            el.classList.remove("select");
            el.style.border = "none";
        });

        const target = ref.querySelector(`[data-id="${page}"]`);
        
        target.classList.add("select");
        target.style.border = "solid var(--orange) 3px"; 
        set(page);
    },[page])


    return (
        <div className="flex flex-row align-center justify-center"  ref={containerRef} style={{width: "100%",height:"100px"}}>
            {LoopForPage(pages,setPage)}
        </div>
    )
}
