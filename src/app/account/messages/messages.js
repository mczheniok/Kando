"use client" 
import { ButtonCircle } from "@/shared/Buttons/Buttons";
import styles from "./messages.module.css"
import { ColumnMessages } from "@/components/Columns/ColumnComponents"
import { Input } from "@/shared/input/input";
import Image from "next/image";
import { parseLastLogin } from "@/features/functions/functions";
import { useState , useRef, useLayoutEffect } from "react"
import BackIcon from "@/icons/back.svg";
import { useSocket } from "@/shared/hooks/useSocket";

export function MessagesPage() {
    const [socket,connected] = useSocket();
    const [chats,setChats] = useState([]);

    useLayoutEffect(() => {
      localStorage.removeItem("current_chat");
      

      const onChats = chats => {
        setChats(chats);
      }
  
      socket.on("chats",onChats);

      if(chats.length === 0) {
        socket.emit("get_chats");
      }

      return () => {
        socket.off("chats", onChats);
      }
    },[chats.length]);

    return (
        <> 
          <ColumnMessages load={connected} list={chats} type={true}></ColumnMessages>
        </>
    )
}



export function Message({obj,me}) {
  const {sender_id,message_text,sent_at,type} = obj;

  const l = sender_id === me;
  const data = type === "rsv"?JSON.parse(message_text):message_text

  return (
    <article className={`${l?styles.Right:styles.Left} flex flex-col align-${l?"end":"start"}`}>
      <h1 className={`${styles.Message} ${l?styles.RightMessage:""}`}>
        {type === "rsv"?
        `📢 Бронювання
• з: ${data.arrivaldate} по ${data.leavedate} 
• гостів: ${data.size}`
        :data}
      </h1>
      <h4 className="small-text">{parseLastLogin(sent_at)}</h4>
    </article>
  )
}

export function Chat({set,myId}) {
  const inputRef = useRef(null);
  const [socket,connected] = useSocket();
  const [messages,setMessages] = useState([]);
  const [message,setMessage] = useState({}); 
  const [chatInfo,setChatInfo] = useState({
    name: "zhen",
    image: "/assets/noimage.webp"
  })
  const scrollRef = useRef(null);

  const scrollContainer = (s = true) => {
    const scrlR = scrollRef.current;

    scrlR.scrollTo({top: scrlR.scrollHeight * 2,behavior: s?"smooth":"instant"}); 
    return 
  }

  const handleBackClick = () => set(3);

  useLayoutEffect(() => {  
    const {current_chat,name,image} = JSON.parse(localStorage.getItem("current_chat"));
    socket.emit("chat_connect",current_chat);

    socket.on("history",messages => {
      setMessages(messages);
      if(messages.length > 15) {
        return scrollContainer(false);
      } else return scrollContainer();
    });

    socket.on("message", msg => {
      setMessages(prev => [...prev.slice(0,30),msg]);
    });

    setChatInfo({name,image})

  },[])

  const handleInput = e => {
    const val = e.target.value;
    setMessage({message_text: val,sender_id: myId,sent_at: new Date().getTime()});
  }

  const handleSubmit = e => {
    e.preventDefault();
  
    setMessages(prev => [...prev.slice(0,30),message]);
    const chat = JSON.parse(localStorage.getItem("current_chat"));

    socket.emit("message",{chatId: chat.current_chat,message: message.message_text});
    inputRef.current.value = "";

    scrollContainer();
  }

  return (
    <div style={{border: "solid var(--border) 1px",borderRadius: ".5rem",height: "80vh"}}>
      <section className={`${styles.ChatHead} flex flex-row align-center justify-between`}>
        <div className="flex flex-row align-center">
          <Image  width={75} alt="User profile Image" height={75} src={`${process.env.NEXT_PUBLIC_SOCKET_URL}/uploads${chatInfo.image}`} className={styles.CircleImage}></Image>
          <div className="flex flex-col align-start justify-around">
          <h1>{chatInfo.name || "none"}</h1>
          <h4 className="small-text">{connected?"Останній раз в мережі 15хв назад":"Помилка Підключення"}</h4>
          </div>
        </div>  
        <ButtonCircle w={75} h={75} Icon={BackIcon} click={handleBackClick} clName={styles.ButtonCircle}></ButtonCircle>
      </section>
      <section className={`${styles.ChatContainer} flex flex-col`}>
        <div className={`${styles.ChatMessages} flex flex-col`} ref={scrollRef}>
          {messages.map((el,ind) => {
            return <Message me={myId} key={`message-el-${ind}`} obj={el}></Message>
          })}
        </div>
        <form onSubmit={handleSubmit} className={`${styles.ChatActions} flex flex-row align-center justify-around`}>
          <Input ref={inputRef} handler={handleInput}></Input>
          <button type="submit"className={styles.sendButton} title="Відправити повідомлення">Відправити</button>
        </form>
      </section>
    </div>
  )
}