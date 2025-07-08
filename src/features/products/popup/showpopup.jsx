import styles from "./popup.module.css";
import { useInputHandler } from "@/shared/hooks/useInputHandler";
import { InputContainer , InputDate , SelectList } from "@/shared/input/input";
import { Button, ButtonMini } from "@/shared/Buttons/Buttons";
import { toServer } from "@/features/functions/functions";

export function ShowPopup({ popupdata }) {  
    const sumPeoples = [1, 2, 3, 4, 5, 6, 7];
    const { show, title ,data } = popupdata;
    const [popUpInfo, handler] = useInputHandler({});

    const handleFormSubmit = e => {
      e.preventDefault();
      console.log(popUpInfo);
      toServer(`/chat/reserve/`,{
        method: "POST",
        headers: {   
          "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`,
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          info: {...popUpInfo},
          ...data
        })
      },false)
      .then(data => {
        if(data.status === "ok") {
          localStorage.setItem("chat",JSON.stringify({
            new_chat: true
          }))
          window.location.href = `/account`;
        }
      }) 
    }

    return (
      <form
        className={`${styles.popup} ${show?styles.show:styles.none} flex flex-col align-center justify-evenly`}
        onSubmit={handleFormSubmit}
      >
        <h1>{title}</h1>
        <InputContainer type={2} text={"Кількість людей"}>
          <SelectList name={"size"} type={2} arr={sumPeoples} formDataRef={popUpInfo}></SelectList>
        </InputContainer>
        <InputContainer type={2} text={"Дата заїзду"}>
          <InputDate name={"arrivaldate"} handler={handler}></InputDate>
        </InputContainer>
        <InputContainer type={2} text={"Дата виїзду"}>
          <InputDate name={"leavedate"} handler={handler}></InputDate>
        </InputContainer>
        <InputContainer type={2}>
          <Button clName={"justify-center"} submit={true} style={"dark"} title={"Забронювати"}></Button>
        </InputContainer>
      </form>
    );
  }