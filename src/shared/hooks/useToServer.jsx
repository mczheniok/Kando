import { SendNotify } from "@/components/Notifications/notification";
import { useState , useEffect } from "react";
import { getFromCache, setToCache } from "../db/indexedDB";
import { BACKEND_URL } from "@/config";

function checkStatus(status) {
    switch(status) {
        case 429: return SendNotify("Забагато запитів","error");
    } 
}

export function useToServer(url,params={},n=true,t=true) { // n = with nofification
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState(t?[]:{});

    useEffect(() => {
        const a = async () => {
            setLoading(true);
            const cached = await getFromCache(url);

            if(cached) {
                setData(cached);
                setLoading(false);
                if (n) SendNotify('Дані з Кешу','success'); 
                return;
            } 

            
            try {
                if(n) SendNotify("Обробка...","info");

                const res = await fetch(`${BACKEND_URL}${url}`, params);                
                const resData = await res.json();
                const { status , err } = resData; 


                if(res.status) checkStatus(res.status); 

                if(err) {
                    if (n) SendNotify(status,"error");
                } else {
                    await setToCache(url,resData.data);
                    setData(resData.data);
                    if(n) SendNotify(status,"success");
                }
            } catch (err) {
                return SendNotify(err, "error");
            } finally {
                setLoading(false);
            }
        }

        a();
    },[url]);


    return [loading,data];
}