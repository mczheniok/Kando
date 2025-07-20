"use client"
import { Button , RefWithIcon } from "@/shared/Buttons/Buttons";
import dynamic from "next/dynamic";

const UserIcon = dynamic(() => import("@/icons/user.svg"));

import HeartIcon from "@/icons/heart.svg";

export function HeadNav() {
    
    return (
        <nav className={`flex flex-row align-center`} >
            <Button title={"Тема"} click={() => {
                const html = document.documentElement;
                const current  = html.getAttribute("data-theme");
                html.setAttribute("data-theme",current === "dark"? "light" : "dark");
            }}></Button>
            <RefWithIcon link={"/account"} Icon={UserIcon} title={"Я"}></RefWithIcon>    
            <RefWithIcon link={"/account/obrani"} Icon={HeartIcon}></RefWithIcon>
        </nav>     
    )
}

