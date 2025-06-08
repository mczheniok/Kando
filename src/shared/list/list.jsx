"use client" 
import { useState } from "react";
import Image from "next/image";

import RowBlock from "@/components/Row/RowBlock"

export function HeaderAndList({id,styl,children,header}) {
    const [selected,setSleected] = useState(arr[0]);


    return (
        <section id={id} className="flex flex-col" style={{height: "100%"}}>
            <RowBlock className="justify-start">
                {header}
            </RowBlock>
            {children}
        </section>
    )
}

export function StarsList({len}) {
    return Array.from({length: Math.floor(len)},(_,i) => i + 1).map((el,ind) => {
        return  
    })
}

