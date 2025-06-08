import { SendNotify } from "@/components/Notifications/notification";

export function share({title,url,text}) {
    if(navigator.share){
        navigator.share({
            title,
            url,
            text
        })
        .catch(() => null);
    } else console.warn("not support")
}



export async function toServer(url,params={},n=true) { // n = with nofification
    try {
        const res = await fetch(`http://localhost:4000${url}`, params);
        console.log("requesting");
        if(n) SendNotify("Обробка","info");

        const data = await res.json();
        const { status , err } = data; 

        if(err) {
            if (n) SendNotify(status,"error");
        }

        else {
            if(n) SendNotify(status,"success");
            return data
        }
    } catch (err) {
        if(n) return SendNotify(err, "error");
    }
}


let timeOut;

export function debounce(callback, delay) {
  return function (...args) {
    if (timeOut) {
      clearTimeout(timeOut); // ← здесь правильно
    }
    timeOut = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}


export function parseLastLogin(lastLogin) {
  const now = new Date();
  const last = new Date(lastLogin);
  const diffMs = now - last;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  let displayTime;
  
  if (diffMinutes < 1) {
    displayTime = "тільки що";
  } else if (diffMinutes < 60) {
    displayTime = `${diffMinutes} хв. назад`;
  } else if (diffHours < 24) {
    displayTime = `${diffHours} годин назад`;
  } else {
    displayTime = `${diffDays} днів назад`;
  }
  
  return displayTime;
}


export const toDate = date => new Date(date).toLocaleString({language: "ua",region: "UA"});
