"use client"

import { useEffect, useRef , useState } from "react"


export function LazyCard({children,height = 400}) {
    const ref = useRef();
    const [show,setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setShow(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "150px"}
        );

        if(ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    },[])

    return (
        <div ref={ref} style={{ minHeight: height }}>
            {show ? children : null}
        </div>
    )
}


