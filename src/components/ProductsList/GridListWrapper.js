"use client";
import GridProductsListComponent from "./GridProductsList"
import { Suspense } from "react";


export function GridProductsList({totalCount,baseUrl,list=[],withPagination=true,showLoadMore=true,currentPage = 1,filter={course: "UAH"}}) {
    return (
        <Suspense fallback={<div style={{minHeight: "600px",width: "100%"}}>Загрузка Списку оголошеннь</div>}>
            <GridProductsListComponent 
                filter={filter}
                baseUrl={baseUrl} 
                totalCount={totalCount} 
                showLoadMore={showLoadMore} 
                currentPage={currentPage} 
                list={list}
                withPagination={withPagination}
            />
        </Suspense>
    )
}
