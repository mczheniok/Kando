import {useEffect,useState} from "react"

export default function usePageRender(pagesListContainer) {
    const [page,setPage] = useState(0)

    useEffect(() => {
        if(!pagesListContainer?.current) return 
        const container = pagesListContainer.current

        container.querySelectorAll(".active").forEach(el => {
            el.classList.remove("active");
            return el.style.color = "var(--secondary-text)";
        })
        
        const trg = pagesListContainer.current.querySelector(`[data-page-el="${page}"]`)
        if(trg) {
            trg.style.color = "var(--orange)";
            trg.classList.add("active");
        }
    },[page,pagesListContainer])

    return [page,setPage]
}