"use client"
import { useToServer } from "@/shared/hooks/useToServer";
import GridProductsList from "@/components/ProductsList/GridProductsList";

export function HistoryPage() {
    const history = JSON.parse(localStorage.getItem("lastcheck"));
    const [_,data] = useToServer("/account/history",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` 
        },
        body: JSON.stringify({history}),
        credentials: "include",
    },false);

    return (
        <>
            <GridProductsList items={data}></GridProductsList>
        </>
    )
}