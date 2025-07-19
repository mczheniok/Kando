"use client"
import { Suspense } from "react";
import AuthWrapper from "./authwrapper";

export default function Page() {
    return (
        <>
            <Suspense fallback={<div style={{minHeight: "100%"}}>Loading</div>}>
                <AuthWrapper></AuthWrapper>    
            </Suspense>
        </>
    )  
}