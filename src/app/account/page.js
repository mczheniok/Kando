"use client"

import { CardBlock } from "@/components/Cards/Card";
import { 
    lazy, 
    Suspense,
} from "react";
import Loading from "@/components/loader";
import { useToServer } from "@/shared/hooks/useToServer";
import MessagesIcon from "@/icons/messages.svg"
import HistoryIcon from "@/icons/history.svg"
import NewIcon from "@/icons/new.svg"


const UserHeaderInfo = lazy(() => import("@/features/account/userInfo/userInfoHead.js").then(module => ({ default: module.userHeadAccount })));   



const Cardsarray = [
    {title: "Повідомлення",icon: MessagesIcon,href: "/messages"},
    {title: "Історія",icon: HistoryIcon,href: "/history"},
    {title: "Нове оголошення",icon: NewIcon,href: "/create"}
]


export default function Main() {
    const [_,data] = useToServer("/account/me",{
        headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
        credentials: "include",
    },false,false);   

    const userData = data;
    
    return (
        <div>
            <section style={{width: "100%",border: "solid var(--border) 1px",borderLeft: "none"}}>
                <Suspense fallback={<Loading/>}> 
                    <UserHeaderInfo subscription={`план: ${userData?.subscription}`} phone={userData?.phone} image={userData?.image} email={userData?.email} username={userData?.username} ></UserHeaderInfo>    
                </Suspense>
            </section>
            <div style={{width: "100%"}}>
                <section className="flex flex-row flex-wrap" style={{ width: "100%",padding: "0rem 0rem"}}>
                    {Cardsarray.map((el) => {
                        return (
                            <CardBlock href={`/account/${el.href}`} title={el.title} Icon={el.icon} key={`${el.title}`}></CardBlock>
                        )
                    })}
                </section>
            </div>
        </div>
    )
}