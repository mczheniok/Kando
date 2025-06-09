"use client"
import { Input, InputContainer } from "@/shared/input/input";
import styles from "./login.module.css"
import { useRef, useState } from "react";
import { Button,  RefWithImg } from "@/shared/Buttons/Buttons";
import Logo from "@/shared/blocks/Logo";

export default function AuthWrapper() {
    const formBody = useRef({});
    const form = useRef({});
    const [formStyle,setFormStyle] = useState(false);


    const handlerInput = e => {
        const i = e.target
        formBody.current[i.name] = i.value;
        console.log(formBody);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:4000/auth/${formStyle?"signup":"login"}`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formBody.current)
        })
        .then(res => {
            if(res.ok) window.location.pathname = "/account";
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:4000/auth/google/callback"; 
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
                <div className="flex flex-col align-center justify-center" style={{background: "var(--orange-transparent)"}}>
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
                    
                    <div className="flex flex-col align-center" style={{width: "100%",padding: "0rem 3rem",height:"fit-content"}}>
                        
                        <div className="flex flex-col align-center" style={{width :"100%",padding: "0rem"}}>
                            {formInputs[Number(formStyle)].map((el,ind) => {
                                return (
                                    <InputContainer key={`form-input-el-${ind}`} type={2} text={el.text}>
                                        <Input handler={handlerInput} type={el.type} placeholder={el.placeholder} name={el.name} ></Input>
                                    </InputContainer>
                                )
                            })}
                        </div>

                        <div className="flex flex-row align-center justify-between" style={{width: "100%"}}>
                            <span className="flex flex-row align-center">
                                <input id="input" style={{width: "24px",height: "24px"}} type="checkbox"></input>
                                <label htmlFor="input">Запам'ятати мене</label>
                            </span>
                            <h4 style={{color: "var(--orange)"}} className={"tw-secondary-text"}>Забули пароль?</h4>
                        </div>

                        <Button title={"Увійти"} submit={true} clName={"justify-center"} style={"orange"}></Button>
                        
                        <div className="divider" style={{width: "100%"}}>або</div>
                        
                        <div className="flex flex-row flex-wrap" style={{width: '100%'}}>
                            <SignButton title={"Github"} img={"github"}></SignButton>
                            <SignButton title={"Google"} img={"google"}></SignButton>
                        </div>
                        
                        <span className="flex flex-row align-center">
                            <h4 className="tw-secondary-text">Ще не маєте акаунту?</h4> 
                            <a className="href-a" onClick={handleClickIdontHaveAccount}>{formStyle?"Ввійти":"Створити акаунт"}</a>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )  
}

        // <div className={styles.Grid} style={{background: "url('/assets/login.jpg')",backgroundSize: "cover",backgroundPosition: "50%",position: "absolute",width: "100%",gap: "0",height:"100svh"}}>
        //     <section className={`${styles.Image} flex flex-col align-center justify-center`}>  
        //         <h1>Welcome To Kando</h1>
        //         <h3>Discover read reviews, and shop with confidence today!</h3>  
        //     </section>
        //     <form onSubmit={handleSubmit} className={`${styles.LoginForm} flex flex-col justify-center align-center`}>
        //     <div className={`${styles.LoginContainer} flex flex-col`} style={{border: "solid var(--orange-transparent) 2px",background: "var(--orange-transparent)",borderRadius: '1rem'}}>
        //         <h1 className="accent-text">USER LOGIN</h1>
        //         <Input name={"email"} handler={handlerInput} placeholder={"email"} type="email"></Input>
        //         <Input name={"password"} handler={handlerInput} placeholder={"password"} type="password"></Input>
        //             <div className="flex flex-row justify-between flex-wrap">
        //                 <SignButton title={"Github"} img={"github"} />
        //                 <SignButton title={"Google"} img={"google"} />
        //             </div>
        //             <div className="flex flex-row align-center justify-between">
        //                 <input className={styles.Radio} type="radio"></input>
        //                 <h3 style={{cursor: "pointer",color: "var(--orange)"}}>ще не маєте акаунта?</h3>
        //             </div>
        //         <div className="flex flex-row">
        //             <button type="submit" className={styles.Submit}>Ввійти</button>
        //             <button type="submit" className={styles.Submit}>Створити</button>
        //         </div>
        //     </div> 
        //     </form>
        // </div>