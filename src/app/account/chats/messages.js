"use client" 
import styles from "./messages.module.css"
import { ColumnMessages } from "@/components/Columns/ColumnComponents"
import { ButtonWithIcon } from "@/shared/Buttons/Buttons"
import { debounce, parseLastLogin } from "@/features/functions/functions";
import { useState , useLayoutEffect } from "react"

import { useSocket } from "@/shared/hooks/useSocket";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/input/input";

import BotIcon from "@/icons/bot.svg";

export function MessagesPage() {
    const router = useRouter();

    const [socket,connected] = useSocket();
    const [chats,setChats] = useState([]);

    useLayoutEffect(() => {
      if(!connected) return ; 

      document.querySelector("header").style.height = "0px";
      document.querySelector("header").style.padding = "0px"; // по желанию
      setTimeout( () => document.querySelector("header").style.display = "none",250)

      const onChats = chats => {
        setChats(chats);
      }
  
      socket.on("chats",onChats);

      if(chats.length === 0) {
        socket.emit("get_chats");
        console.log(chats);
      }

      socket.on("search-results",onChats)

      return () => {
        socket.off("chats", onChats);
      }
    },[connected]);

    const SupportChat = () => {
      router.push(`/account/chats/new/support?type=bot`);
    } 

    const searchHandler = debounce((e) => {
      const value = e.target.value
      if(value.length > 3) socket.emit("chat_search",{search: value});
      return;
    },400)

    return (
        <div style={{height: "100%",position: "relative",background: "var(--background)"}}> 
          <div className="flex flex-col" style={{background: "var(--background)",borderBottom: "solid var(--border) 1px",padding: "1.5rem",gap: "1.5rem"}}>
            <h1 className="h1-text">Повідомлення</h1>
            <Input type="search" handler={searchHandler} name={"search"} value={""} placeholder={"Пошук Чатів"}></Input>
          </div>

          <ColumnMessages load={false} list={chats} type={true}></ColumnMessages>
          <div style={{width: "100%",position:"absolute",bottom:"0",top: "100%",background: "var(--background)",padding:"1.5rem",borderTop: "solid var(--border) 1px",height: "fit-content"}} className="flex">
            <ButtonWithIcon click={SupportChat} style="purple" Icon={BotIcon} title={"Чат з підтримкою"} clName={"justify-center flex-grow"}></ButtonWithIcon>
          </div>
        </div>
    )
}




