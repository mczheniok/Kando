"use client"

import { CardBlock } from "@/components/Cards/Card";
import { 
    lazy, 
    Suspense,
} from "react";
import Loading from "@/components/loader";
import { Information } from "@/shared/information/information";

import { useToServer } from "@/shared/hooks/useToServer";

import MessagesIcon from "@/icons/messages.svg"
import HistoryIcon from "@/icons/history.svg"
import NewIcon from "@/icons/new.svg"
import { None } from "@/shared/information/none";


const UserHeaderInfo = lazy(() => import("@/features/account/userInfo/userInfoHead.js").then(module => ({ default: module.userHeadAccount })));   


const Cardsarray = [ 
    {title: "Повідомлення",icon: MessagesIcon,href: "/messages"},
    {title: "Історія",icon: HistoryIcon,href: "/history"},
    {title: "Нове оголошення",icon: NewIcon,href: "/create"}
]

function NotificationContainer() {
    const [isLoading, list] = useToServer("/notification/all");

    if (isLoading) {
        return <Loading />;
    }

    if (!list || list.length === 0) {
        return <None />;
    }

    return (
        <div className="flex flex-col" style={{ padding: "1rem" }}>
            {list.map((el, ind) => {
                const title = el.type === "pending"
                    ? `Оголошення: "${el.name}" відправлено на модерацію`
                    : `Потрібні зміні в оголошенні ${el.name}`;

                const description = el.type === "warn"
                    ? `Оголошення: "${el.name}" модерацію не пройшло`
                    : `Ваше оголошення "${el.name}" на розгляді. Очікуваний час: 2-4 години.
                       Ми перевіряємо відповідність правилам та якість фотографій.`;

                return (
                    <Information
                        key={`notification-${ind}`}
                        type={el.type}
                        title={title}
                        id={el._id}
                        description={description}
                    />
                );
            })}
        </div>
    );
}


export default function Main() {
    const [_,data] = useToServer("/account/me",false,false)

    const userData = data;
    
    return (
        <div>
            <section style={{width: "100%",border: "solid var(--border) 1px",borderLeft: "none"}}>
                <Suspense fallback={<Loading/>}> 
                    <UserHeaderInfo subscription={`план: ${userData?.subscription}`} phone={userData?.phone} image={userData?.image} email={userData?.email} username={userData?.username} ></UserHeaderInfo>    
                </Suspense>
            </section>

            <div style={{width: "100%"}}>
                <section className="flex flex-row flex-wrap" style={{ width: "100%",gap: "0rem",padding: "0rem 0rem"}}>
                    {Cardsarray.map((el) => {
                        return (
                            <CardBlock href={`/account/${el.href}`} title={el.title} Icon={el.icon} key={`${el.title}`}></CardBlock>
                        )
                    })}
                </section>
            </div>

            <NotificationContainer />
        </div>
    )
}