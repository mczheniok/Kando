"use client"

import GridProductsList from "@/components/ProductsList/GridProductsList";
import { useEffect , useState } from "react";
import { toServer } from "../../../features/functions/functions";

export default function HistoryPage() {
    const likes = typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("likes") || "{}") 
    : {};

    const [data,setData] = useState([]);

    useEffect(() => {
        toServer("/account/likes",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({likes}),
            credentials: "include"
        },false)
        .then(resData => setData(resData));
    },[]);

    return (
        <GridProductsList itemsPerPage={4} totalCount={data.length} items={data}></GridProductsList>
    )
}