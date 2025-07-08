"use client"
import { share } from "../functions/functions"
import { ButtonCircle } from "@/shared/Buttons/Buttons"
import ShareIcon from "@/icons/share.svg";

export function ButtonShare({id}) {
    return <ButtonCircle click={() => share({
        title: "Kando є все",
        text: "Переглянь це оголошення",
        url: `${process.env.NEXT_PUBLIC_URL}/product/${id}`
    })} Icon={ShareIcon} ></ButtonCircle>
}