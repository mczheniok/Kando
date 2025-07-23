import { SendNotify } from "@/components/Notifications/notification";
import { BACKEND_URL } from "@/config";


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
        const res = await fetch(`${BACKEND_URL}${url}`, params);
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


export function debounce(callback, delay) {
  let timeOut;
  
  return function (...args) {
    if (timeOut) {
      clearTimeout(timeOut);
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
    displayTime = `${diffHours} години назад`;
  } else {
    displayTime = `${diffDays} днів назад`;
  }
  
  return displayTime;
}

export const parseData = date => new Date(date).toTimeString().slice(0,5);

export const toDate = date => new Date(date).toLocaleString({language: "ua",region: "UA"});

export const isClient = () => typeof window === "undefined"

export const isUndefined = (e,f) => e !== undefined?f():null 



export function parsePrice(price,type = "UAH") {
  switch(type) {
    case "UAH": return `${price} ₴`; // гривні

    case "EUR": return `${Math.ceil(price / 48.85)} €`; // євро

    case "DOL": return  `${Math.ceil(price / 41.77)} $`; // долар

    default: return `${price} ₴`;
  }
}

export function parseGrade(length ) {
  return "⭐".repeat(parseFloat(length));
}


export function parsePhoneNumber(number) {
  // Удалим всё, кроме цифр и плюса
  if(!number) {
    return "";
  }

  number = number.replace(/[^\d+]/g, '');

  const match = number.match(/^\+?(\d{1,3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (!match) return number; // если номер не подходит — вернуть как есть

  const [, country, operator, part1, part2, part3] = match;

  return `+${country} (${operator}) ${part1}-${part2}-${part3}`;
}


export function sliceText(text,len) { 
  return text.length > len ? text.slice(0,len) + "...": text
}

