"use client"
import { share } from "../functions/functions"
import { ButtonCircle } from "@/shared/Buttons/Buttons"
import ShareIcon from "@/icons/share.svg";

export function ButtonShare() {
    return <ButtonCircle click={() => share({
        title: "Kando є все",
        text: "Переглянь це оголошення",
        url: window.location.href
    })} Icon={ShareIcon} ></ButtonCircle>
}