"use client";
import { None } from "@/shared/information/none"
import { Chat } from "../Cards/Card"
import { CardRow } from "@/features/account/userInfo/cards/cardRow"
import { ReviewRow} from "../Products/Reviews"
import Loading from "../loader"

import { useRouter } from "next/navigation";

export function Column({load, list = [], type = false}) {
    const renderContent = () => {
        if (load) {
            return <Loading time={200}/>;
        }
        
        // Проверяем, что list это массив
        if (!Array.isArray(list) || list.length === 0) {
            return <None />;
        }
        
        return list.map((el, ind) => (
            <CardRow 
                t={type} 
                key={`column-el-ind-${ind}`} 
                obj={el}
            />
        ));
    };

    return (
        <section 
            className="flex flex-col" 
            style={{
                width: "100%",
                padding: "0rem 2rem 0rem 0rem",
                margin: "1rem",
                height: "fit-content",
                marginBottom: "5rem"
            }}
        >
            {renderContent()}
        </section>
    );
}



export function ColumnReviews({list,img = null}) {
    return (
        <section className="flex flex-col" style={{width: "100%",overflowY: "auto"}}>
            {list.map((el,ind) => {
                return (
                    <ReviewRow key={`reviews-list-el-${ind}`} obj={el} src={el.src}></ReviewRow>
                )
            })}
        </section>
    )
}


export function ColumnMessages({load,list}) {
    const router = useRouter();

    const handleClick = (id,chat_type) => {
        router.push(`/account/chats/${id}?type=${chat_type}`)
    }

    return (
        <section className="flex flex-col" style={{width: "100%",minHeight: "55svh",height: "100%",gap: "0rem",marginBottom: "5rem"}}>
            {load?<Loading time={200}/>:list?.length === 0 && !load?<None />:list?.map((el,ind) => {
                return (
                    <Chat obj={el} click={handleClick} key={`message-el-${ind}`} />
                )
            })}
        </section>
    )
}

