"use client"
import { Suspense } from "react";
import AuthWrapper from "./authwrapper";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Suspense fallback={<div style={{minHeight: "100%"}}>Loading</div>}>
                <AuthWrapper></AuthWrapper>    
            </Suspense>
        </>
    )  
}