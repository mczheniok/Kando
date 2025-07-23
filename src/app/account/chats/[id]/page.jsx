"use client";

import styles from "./chat.module.css";

import { Input } from "@/shared/input/input";

import { useParams , useSearchParams } from "next/navigation"
import { useSocket } from "@/shared/hooks/useSocket";
import { debounce, parseData } from "@/features/functions/functions";


import {
    useRef,
    useState,
    useLayoutEffect,
} from "react"
import { useRouter } from "next/navigation";

import BackIcon from "@/icons/back.svg";
import MoreIcon from "@/icons/more.svg";
import ClipIcon from "@/icons/clip.svg";
import BotIcon from "@/icons/bot.svg";

export default function chatPage() {
    const params = useParams();
    const id = params.id;

    const searchParams = useSearchParams();

    return (
        <Chat chatId={id} chatType={searchParams.get("type")}/>
    )
}

const BackButton = ({click}) => {
  return (
    <button onClick={click} style={{border: "none",background: "none"}}>
      <BackIcon width={27} height={27} />
    </button>
  )
}

const ChatMoreButton = ({click,text}) => {
  return (
    <button onClick={click} className="flex justify-center align-center" style={{border: "none",background: "none"}}>
      <MoreIcon width={27} height={27} />
    </button>
  )
}

const ChatButton = ({click,text}) => {
  return (
    <button onClick={click} style={{border: "none",background: "none"}}>
      <p className="h1-text" style={{padding:"1rem"}}>{text}</p>
    </button>
  )
}

const ChatClipButton = ({click}) => {
  return (
    <button onClick={click} style={{border: "none",background: "none"}}>
      <ClipIcon width={35} className={styles["attach-button-bot"]} height={35} />
    </button>
  )
} 

const ChatBotButton = ({handler,id,text}) => {
  return (
    <button onClick={() => handler(id)} className={styles["quick-button"]}>
      <p style={{color: "inherit"}}>{text}</p>
    </button>
  )
}


function InputCotainer ({setMessages,chatId,bot,socket,myId,scrollContainer}) {
  const inputRef = useRef(null);
  const [message,setMessage] = useState({}); 

  const handleSubmit = e => {
    e.preventDefault();
    
    setMessages(prev => [...prev.slice(0,30),message]);
    
    const SendMessage = {
      chat_id: chatId,
      message_type: "text",
      message_text: message.message_text
    }

    socket.emit("message",SendMessage);
    inputRef.current.value = "";
    
    scrollContainer();
}


  const handleInput = (e) => {
    const val = e.target.value;
    const newMessage = {
      id: Date.now(),
      sent_at: new Date().toLocaleString('sv-SE', { timeZone: 'UTC' }).replace(' ', 'T') + 'Z',
      edited_at: null,
      sender_id: "me",
      is_edited: false,
      message_text: val,
      message_type: "text",
      sender_username: "zhen"
    }


    setMessage(newMessage);
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-row align-center justify-around`}>
        <ChatClipButton />
        <Input clName={"flex-grow"} ref={inputRef} handler={handleInput}></Input>
        <button type="submit"className={`${styles["send-button"]} ${bot ? styles["send-button-bot"] : ""}`} title="Відправити повідомлення">📨</button>
    </form>
  )
} 


export function Chat({myId,chatId,chatType = "direct"}) {
    const [socket,connected] = useSocket();
    const [messages,setMessages] = useState([]);
    const [chatInfo,setChatInfo] = useState({
      name: "zhen",
      image: "/assets/noimage.webp",
      myId: ""
    });

    const router = useRouter();
    
    const scrollRef = useRef(null);

    const scrollContainer = (s = true) => {
      const scrlR = scrollRef.current;
      
      if(!scrlR) return;

      scrlR.scrollTo({top: scrlR.scrollHeight * 2,behavior: s ?"smooth":"instant"}); 
      return 
    }
  
    const QuickHandler = (id) => {
      socket.emit("quick-click",{
        quick_id: id,
        chat_id: chatId,
        bot_name: "@support"
      });
    }

    const readHandler = (id) => {
      const readed = {
        chat_id: chatId,
        message_id: id   
      }

      socket.emit("message-read",readed);
    }


    useLayoutEffect(() => {        
      if(!connected) return ;

      document.body.style.overflow = "hidden";

      const connectionInfo = {
        chat_id: chatId,
      }

      socket.emit("chat_connect",connectionInfo)
  
      socket.on("history",(history) => {
        const {
          messages,
          yourId
        } = history;
        setMessages(messages);

        setChatInfo(prev => ({
          ...prev,
          myId: yourId
        }))

        if(messages.length > 15) {
          return scrollContainer(false);
        } else return scrollContainer();
      });
  
      socket.on("message", msg => {
        setMessages(prev => [...prev.slice(0,40),msg]);
      });

      socket.on("message-read",({message_id}) => {
        document.querySelector(`[data-message-id="${message_id}"`).textContent = "Прочитано";
      })

      socket.on("chat_details",(details) => {
        setChatInfo(prev => ({
          ...prev,
          name: "Техпдітримка Kando",
          description: "Онлайн 24 / 7"
        }))
      })

    },[connected]);  

    const list = [
      {title: "🚀 Как продавать?",id: 0},
      {title: "💰 Комиссии",id: 1},
      {title: "⭐ Рейтинг",id: 2}
    ]

  
    const handleBackClick = () => router.back();

    const bot = chatType === "bot";

    return (
      <div className={styles.ChatContainer}>
        <section className={`${styles[ bot ? "chat-header-bot": "chat-header"]} flex flex-row align-center justify-between`}>
            <div className="flex flex-row align-center">
              <BackButton click={handleBackClick}/>      

              <div className="flex flex-col align-center justify-center" style={{position: "relative"}}>
                {!bot && (
                  <div className={`${styles["chat-avatar-bot"]} ${styles["chat-avatar"]} flex justify-center align-center circle`}>
                    <BotIcon width={30} height={30} />
                  </div>      
                )}

                {bot && (
                  <div className={`${styles["chat-avatar-bot"]} ${styles["chat-avatar"]} flex justify-center align-center circle`}>
                    <BotIcon width={30} height={30} />
                  </div>
                )}      
              </div>

              <div className="flex flex-col align-start justify-around" style={{gap: ".5rem"}}>
                <h2 className={styles[ bot? "chat-user-name-bot" : "chat-user-name"]}>{chatInfo.name || "none"}</h2>
                <h4 className={`${styles[ bot ? "chat-user-status-bot" : "chat-user-status" ]} small-text h4-text`}>{connected ? chatInfo.description  || "24 / 7": "Помилка Підключення" }</h4>
              </div>
            </div>
          
            <div className="flex flex-row align-center">
              {!bot && (
                <>
                  <ChatButton text={'📞'}/>
                </>
              )}
              <ChatMoreButton />
            </div>
        </section>
        <section className={`flex flex-col`} style={{overflow: "auto"}}>
          <div className={`${styles["messages-container"]} flex flex-col`} style={{height: bot ? "70svh":"80svh"}} ref={scrollRef}>
            {messages.map((el,ind) => {
              return (
                <Message readHandler={readHandler} me={chatInfo.myId} key={`message-el-${ind}`} message={el}></Message>
              )
            })}
          </div>
        </section>
        <div className={`${bot ? styles["input-container-bot"] : styles["input-container"]} flex flex-col `}>
          <InputCotainer bot={bot} setMessages={setMessages} myId={myId} scrollContainer={scrollContainer} socket={socket} chatId={chatId}/>
          {bot && (
            <div className="flex flex-row flex-wrap" style={{overflowY: "auto",height: "10svh"}}>
              {list.map((text,ind) => {
                return (
                  <ChatBotButton key={`quick-button-${ind}`} handler={QuickHandler} id={text.id} text={text.title}/>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  export function Message({message,me,readHandler}) {
    const {
      id,
      sent_at,
      edited_at,
      sender_id,
      is_edited,
      message_text,
      message_type,
      sender_username
    } = message;


    const l = sender_id === me || sender_id === "me";

    const bot = message_type === "bot_response"; 

    if(l) {
      setTimeout(() => {
        readHandler(id);
      },50); 
    }

    return (
      <div className={`${styles["message-wrapper"]} ${styles[l ? "right" : "left"]}`}>
        <div className={` 
          ${styles.message}
          ${styles[bot?"message-bot": l?"message-user":"message-other"]}
          flex flex-col
        `}
        >
          {bot && (
            <div className={`${styles["bot-header"]} flex flex-row align-baseline`} style={{gap: "10px"}}>
              <BotIcon width={15} height={15} className={styles["bot-icon"]}/>
              <p className={`${styles["bot-name"]} h4-text`}>Kando Bot</p>
            </div>
          )}

          <p className={styles["message-text"]} style={{color: l?"var(--background)":""}}>
            {message_text}
          </p>

          <div className="flex flex-row justify-between align-centern">
            <h4 className={`${styles[bot?"message-time-bot":"message-time"]} h4-text`} style={{color: !l && "var(--primary)" }}>{parseData(sent_at)}</h4>
            {is_edited && (
              <h4 className="small-text h4-text">змінено</h4>
            )}
            <h4 className="h5-text small-text" data-message-id={id}>не прочитано</h4>
          </div>
        </div>
      </div>
    )
  }
  
            /* {type === "rsv"?
          `📢 Бронювання
  • з: ${data.arrivaldate} по ${data.leavedate} 
  • гостів: ${data.size}`
          :data} */