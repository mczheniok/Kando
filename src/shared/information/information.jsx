import { toServer } from "@/features/functions/functions";
import { ButtonCircle } from "../Buttons/Buttons";
import TrashIcon from "@/icons/trash.svg";

export const InformationTitles = {
    "product": {
        title: "Безпека угод",
        description: "Перевіряйте товар перед купівлею. Зустрічайтесь у безпечних місцях. Не передавайте гроші наперед. Kando не несе відповідальності за угоди між користувачами."
    },
    "change": {
        "title": "Потрібні зміни"
    },
    "pending": {
        title: "Модерація в процесі",
        description: `У вас є 2 оголошення на розгляді. Очікуваний час: 2-4 години.
        Ми перевіряємо відповідність правилам та якість фотографій.`
    }
}



export function Information ({
    type = "warn",
    title =  "Безпека угод",
    description = "Перевіряйте товар перед купівлею. Зустрічайтесь у безпечних місцях. Не передавайте гроші наперед. Kando не несе відповідальності за угоди між користувачами.",
    id = ""    
}) {
    const emojisList = {
        "warn": "⚠️",
        "info": "⏳",
        "success": "🏷️"
    };

    const ColorList = {
        "warn": {
            text: "#856404",
            background: "var(--bg-info)",
            border: "solid var(--bg-info--border) 2px" 
        }, 
        "pending": {
            text: "#0c5460",
            background: "#d1ecf1",
            border: "#0c5460"
        }, 
    } 

    const handleClickRemove = async () => {
        await toServer(`/notification/delete/${id}`,{
            method: "DELETE",
            credentials: "include"
        });
        const target = document.querySelector(`[data-notification-id="${id}"]`);  
            console.log(target)

        if(target) target.remove();
    }

    return (
        <section data-notification-id={id}   style={{width: "100%",padding: "1rem",borderRadius: "1rem",border: ColorList[type].border,background: ColorList[type].background}} className="flex flex-col align-start">
          <div className="flex flex-row align-center justify-between">
            <span style={{fontWeight: "600",color: ColorList[type].text}} className="h3-text">{emojisList[type]} {title}</span>
            <ButtonCircle click={() => handleClickRemove()}  Icon={TrashIcon} color="red"></ButtonCircle>
          </div>
          <p className="h3-text" style={{fontWeight: "200",color: ColorList[type].text,lineHeight: "1.4"}}> 
            {description}
          </p>
        </section>
    )
}