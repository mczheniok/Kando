"use client";
import SearchComponent from "./Search"
import { Suspense } from "react";

export function Search({placeholder}) {
    return (
        <Suspense fallback={<div>Завантаження пошуку...</div>}>
            <SearchComponent placeholder={placeholder}/>
        </Suspense>
    )
}