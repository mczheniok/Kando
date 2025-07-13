"use client"

import GridProductsList from "@/components/ProductsList/GridProductsList";
import { useEffect , useState } from "react";
import { toServer } from "../../../features/functions/functions";

export default function HistoryPage() {
    const history = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("lastcheck") : "{}");
    const [data,setData] = useState([]);

    useEffect(() => {
        toServer("/account/history",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({history}),
            credentials: "include"
        },false)
        .then(resData => setData(resData));
    },[])

    return (
        <>
            <GridProductsList items={data}></GridProductsList>
        </>
    )
}