"use client"
import { Input, InputContainer } from "@/shared/input/input";
import styles from "./login.module.css"
import { useRef, useState } from "react";
import { Button,  RefWithImg } from "@/shared/Buttons/Buttons";
import Logo from "@/shared/blocks/Logo";
import { useRouter } from "next/navigation";

export default function AuthWrapper() {
    const formBody = useRef({});
    const form = useRef({});
    const [formStyle,setFormStyle] = useState(false);
    const router = useRouter();

    const [status,setStatus] = useState(false);

    const handlerInput = e => {
        const i = e.target
        formBody.current[i.name] = i.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/auth/${formStyle?"signup":"login"}`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formBody.current)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "ok") {
                setTimeout(() => {
                    router.push('/account');
                },1000);
            }

            setStatus(data.status);

            console.log(data.status);
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/auth/google/callback`; 
    const loginUrl =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;


    const SignButton = ({title,img}) => {
        return (
            <RefWithImg style={"orange"} clName={"flex-grow justify-evenly  "} link={loginUrl} Icon={`/logos/${img}.png`} alt={img} title={title}></RefWithImg>
        )
    }

    const handleClickIdontHaveAccount = () => {
        formBody.current.password = '';
        formBody.current.email = '';
        formBody.current.password_verify = '';
        setFormStyle(prev => !prev);
        console.log(form)
    }

    const HeadSubInfo = [
        {emoji: "✓",text: "Перевірені відгуки користувачів"},
        {emoji: "⭐",text: "Рейтинги товарів та послуг"},
        {emoji: "🛡️",text: "Безпечні покупки"}
    ]

    const formInputs = [
        [
            {text: "Електронна пошта",type: "email",name: "email",placeholder: "example@gmail.com"},
            {text: "Пароль",type: "password",name: "password",placeholder: "Введіть пароль"},
        ],
        [
            {text: "Електронна пошта",type: "email",name: "email",placeholder: "example@gmail.com"},
            {text: "Пароль",type: "password",name: "password",placeholder: "Введіть пароль"},
            {text: "Підтвердити пароль",type: "password",name: "password_verify",placeholder: "Ваш пароль"},
        ]
    ]

    return (
        <div className="flex flex-row align-center justify-center" style={{width: '100%',height: "100%",backgroundImage: "url('/assets/login.jpg')",background: "cover",backgroundRepeat: 'no-repeat'}}>
            <form onSubmit={handleSubmit} className={`${styles.Form} flex flex-row`}>
                <div className={`${styles.loginInfo}  flex flex-col align-center justify-center`} style={{background: "var(--orange-transparent)"}}>
                    <Logo type={true} size={"h1-text accent-text"}></Logo>
                    <h3 style={{fontSize: "1.3rem"}} className={styles.HeaderSubText}>Відкрийте для себе чесні відгуки та робіть покупки з впевненістю</h3>
                
                    <div className="flex flex-col align-start" style={{width: '80%',height :"fit-content",marginTop: "2rem"}}>
                        {HeadSubInfo.map((el,ind) => {
                            return (
                                <span className="flex flex-row align-center" key={`info-el-${ind}`}>
                                    <h3 className={styles.Circle}>{el.emoji}</h3>
                                    <h3 className={styles.HeaderSubText} style={{textWrap: "nowrap"}}>{el.text}</h3>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col align-center justify-evenly" style={{background: "var(--bg-card)"}}>
                    <div className="flex flex-col align-center" style={{height :'fit-content'}}>
                        <h1 style={{fontSize: "2rem",textWrap: "nowrap"}}>Увійти до акаунту</h1>
                        <h2 style={{fontSize: "1rem"}} className={"tw-secondary-text"}>Введіть свої дані для входу</h2>
                    </div>
                    
                    <div className="flex flex-col align-center" style={{gap: ".3rem",width: "100%",padding: "0rem 3rem",height:"fit-content"}}>
                        
                        <div className="flex flex-col align-center" style={{gap: "0rem",width :"100%",padding: "0rem"}}>
                            {formInputs[Number(formStyle)].map((el,ind) => {
                                return (
                                    <InputContainer key={`form-input-el-${ind}`} type={0} text={el.text}>
                                        <Input required={true} handler={handlerInput} type={el.type} placeholder={el.placeholder} name={el.name} ></Input>
                                    </InputContainer>
                                )
                            })}
                        </div>

                        {status && (
                            <div className="flex flex-row align-start" style={{padding: ".6rem 0rem"}}>
                                <span style={{color: "#ff7043"}}>{status}</span>    
                            </div> 
                        )}

                        <div className="flex flex-row align-center justify-between" style={{marginBottom: "1rem",width: "100%"}}>
                            <span className="flex flex-row align-center">
                                <input id="input" style={{width: "24px",height: "24px"}} type="checkbox"></input>
                                <label htmlFor="input">Запам'ятати мене</label>
                            </span>
                            <h4 style={{color: "var(--orange)"}} className={"tw-secondary-text"}>Забули пароль?</h4>
                        </div>

                        <Button title={"Увійти"} submit={true} clName={"justify-center"} style={"orange"}></Button>
                        
                        <div className="divider" style={{width: "100%"}}>або</div>
                        
                        <div className="flex flex-row flex-wrap" style={{width: '100%'}}>
                            <SignButton title={"Google"} img={"google"}></SignButton>
                        </div>
                        
                        <span className="flex flex-row align-center justify-between">
                            <h4 className="tw-secondary-text">Ще не маєте акаунту?</h4> 
                            <a className="href-a" onClick={handleClickIdontHaveAccount}>{formStyle?"Ввійти":"Створити акаунт"}</a>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )  
}