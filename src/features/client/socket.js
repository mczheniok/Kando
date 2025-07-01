import { io } from "socket.io-client";
import { isClient } from "../functions/functions";


export let socket = null;

const socketConnect = () => {
    if(isClient()) return null;
    
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL_URL


    return io(URL,{
        auth: {
            token: localStorage.getItem("token")
        },
        autoConnect: false
    });
}

socket = socketConnect();

