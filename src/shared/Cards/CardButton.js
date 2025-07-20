"use client";
import { ButtonWithIcon } from "../Buttons/Buttons";
import { ButtonShare } from "@/features/client/client"

import HeartIcon from "@/icons/heart.svg";

export function CardButtonContainer({id}) {
    const handler = () => {
        const prev = JSON.parse(localStorage.getItem("likes")) || []; 
        localStorage.setItem("likes",JSON.stringify([...prev,id]));
    }

    return (
        <div className="flex flex-row align-center">
            <ButtonShare id={id}></ButtonShare>
            <ButtonWithIcon Icon={HeartIcon} clName={"flex-grow justify-around"} click={handler} style="dark" title={"В Обрані"}></ButtonWithIcon>
        </div>
    )
}