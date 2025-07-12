"use client";
import GridProductsListComponent from "./GridProductsList"
import { Suspense } from "react";


export function GridProductsList({count,baseUrl,list=[],showLoadMore=true}) {
    return (
        <Suspense fallback={<div>Загрузка Списку оголошеннь</div>}>
            <GridProductsListComponent baseUrl={baseUrl} count={count} showLoadMore={showLoadMore} list={list}/>
        </Suspense>
    )
}
