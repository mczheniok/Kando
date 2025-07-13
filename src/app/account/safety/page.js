"use client";



import { useToServer } from "../../../shared/hooks/useToServer";
import { parseLastLogin } from "../../../features/functions/functions";
import { Button } from "../../../shared/Buttons/Buttons";
import Loading from "../../../components/loader";
import styles from "../account.module.css"

import LinuxIcon from "@/icons/linux.svg";
import AppleIcon from "@/icons/apple.svg";
import AndroidIcon from "@/icons/android.svg";
import ChromeIcon from "@/icons/chrome.svg";
import UnknownIcon from "@/icons/linux.svg";


function CheckPlatform(sys) {
    switch(sys) {
        case "Linux": return LinuxIcon;
        case "Unknown": return UnknownIcon;
        case "Chrome": return ChromeIcon;
        case "Apple": return AppleIcon;
        case "Android": return AndroidIcon;
        default: return UnknownIcon;
    }    
}

function CheckColor(System) {
    switch(System) {
        case "Linux": return "linear-gradient(135deg, rgb(60,179,113), rgb(46,139,87))"; // зелёный
        case "Unknown": return "linear-gradient(135deg, rgb(169,169,169), rgb(128,128,128))"; // серый
        case "Chrome": return "linear-gradient(135deg, rgb(66,133,244), rgb(52,168,83))"; // синий-зелёный
        case "Apple": return "linear-gradient(135deg, rgb(255,255,255), rgb(200,200,200))"; // бело-серый
        case "Android": return "linear-gradient(135deg, rgb(164,198,57), rgb(141,182,0))"; // ярко-зелёный
        default: return "linear-gradient(135deg, rgb(169,169,169), rgb(128,128,128))"; // если вдруг что-то неизвестное
    }
}

  
function SessionBlock ({session}) {
    const handleRemove = async (id) => {
        toServer(`/sessions/remove/${id}`,{
            method: "DELETE",
            headers: { "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
            credentials: "include"
        })
        .then(() => {
            document.querySelector(`[data-session-id="${id}"]`).remove();
        })
    };

    return (
        <>
            {session && session.length > 0 ? 
                session.map((el, ind) => {
                    const PlatformIcon = CheckPlatform(el.platform);

                    return (
                        <div 
                            key={`session-el-${ind}`} 
                            style={{width: "100%",background: "var(--bg-glass)",border: "solid var(--border) 1px",padding: "1rem",borderRadius: "1rem",minHeight: "150px"}} 
                            className={`${styles.SessionCard} flex flex-row`}
                            data-session-id={el.sessionId}
                        >
                            <div className="flex flex-col justify-around" style={{width: "100%"}}>
                                <div className="flex flex-row"> 
                                    <div className="flex flex-col align-center justify-center" style={{width: "75px",height: "75px"}}>
                                        <div className={`${styles.PlatformBackground} flex flex-col align-center justify-center`} style={{backgroundImage: CheckColor(el.platform)}}>
                                            <PlatformIcon width={50} height={50} ></PlatformIcon>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-around" style={{paddingBottom: "1rem",borderBottom: "solid var(--border) 1px",flexGrow: '1'}}>
                                        <h2>{el.platform}</h2>
                                        <h3>{el.platform} / {el.browser}</h3>
                                    </div>
                                </div>  
                                <div className="flex flex-row justify-between flex-wrap">
                                    <div className="flex flex-row " style={{gap: "1rem"}}>
                                        <h3 style={{minWidth: "30%",textAlign: "center",height: "fit-content",padding: "0.2rem 1rem"}}>
                                        🌍 {el.adress} / {parseLastLogin(el.lastLogin)}
                                        </h3>
                                    </div>
                                    <Button title={"Завершити"} click={handleRemove} style={"red"} clName={"flex-grow align-center justify-center"}></Button>
                                </div>
                            </div>
                        </div>
                    )
                })
            : <Loading />}
        </>
    )
}

export default function Page() {
    const [load,data] = useToServer("/sessions/all",{
        headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
        credentials: "include"
    },false);

    return (
        <div>
            <section style={{width: "100%",border: "solid var(--border) 1px",borderLeft: "none"}}>

            </section>
            <div style={{width: "100%",marginBottom: "1rem"}}>
                <section className="flex flex-row flex-wrap" style={{ width: "100%",padding: "1rem"}}>
                </section>
            </div>
            <div className="flex flex-col" style={{margin: "1rem 0rem",padding: "1rem"}}>
                <h1>Активні Сесії</h1>
                {load? <Loading time={500}/>:<SessionBlock session={data}></SessionBlock>}
            </div> 
        </div>
    )
}

