"use client"
import styles from "./userhead.module.css"
import { useRef, useState } from "react";
import { SkeletonWithShimmer , SkeletonCircleWithShimmer } from "@/shared/information/skeleton";
import { toServer } from "@/features/functions/functions";
import { ButtonWithIcon , Button } from "@/shared/Buttons/Buttons";
import EditIconSVG from "@/icons/edit.svg";

const Input = ({val,type,name,handler}) => {
    const [value,setValue] = useState(val);

    return (
        <input 
            className={styles.input}
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
                handler(e);
            }}  
            name={name}
            type={type}
        />
    )
}


export function userHeadAccount({
    username,
    email,
    image = "/assets/noimage.webp",
    subscription = "pro",
    phone = "380"
    }) 
  {
    const [change,setChange] = useState(false)
    const [submit,setSubmit] = useState(false);
    
    const formDataRef = useRef(new FormData());
    const ImageUrl = useRef(null);

    const handleInput = (e) => {
        const val = e.target.value 
        const name = e.target.name

        if(val && name) {
            formDataRef.current.set(name,val);
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault();


        toServer("/account/change",{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`,
            },
            credentials: "include",
            body: formDataRef.current
        },true);
    }   


    const handleFileInput = e => {
        const file = e.target.files[0];

        formDataRef.current.set("image",file);
    
        ImageUrl.current.src = URL.createObjectURL(file);   
    }


    const UserAvatar = ({width,height}) => {
        const [src,setImg] = useState(image.includes("h3.googleusercontent.com")?image:`${process.env.NEXT_PUBLIC_URL}/images/${image}`);

        return (
            <img width={width} ref={ImageUrl} height={height} src={src} onError={() => setImg("/assets/noimage.webp")} className={`${styles.circleImage} circle`} alt="User Avatar"></img>
        );
    }

    return (
      <form onSubmit={handleFormSubmit} className={`${styles.userInfo} flex flex-row`} style={{width: "100%",padding: "1rem",background: "var(--bg-card)"}}>
            <label htmlFor="fileInput">
              <UserAvatar ref={ImageUrl} width={"100px"} height={"100px"}></UserAvatar>
            </label>
            <input onChange={handleFileInput} id="fileInput" type="file" style={{display: "none"}}></input>
          <div className={`flex flex-col ${styles.flexColumn}`} style={{width: "100%"}}>
            {username?
            <>
                <div style={{width: '100%'}} className="flex flex-row justify-between flex-grow align-center flex-wrap">
                        <div style={{width: "fit-content"}}>
                            {change ?
                                <Input placeholder="юзер нейм" handler={handleInput} val={username} name={"username"} type={"text"}></Input>
                            :<h2>{username}</h2>
                            }
                        </div>
                    <ButtonWithIcon click={() => {
                        setSubmit(p => !p);
                        setChange(p => !p)
                    }} title={submit?"Зберигти":"Змінити"} Icon={EditIconSVG}></ButtonWithIcon>
                </div>

                <h3>{subscription}</h3>
                
                <h4 className="secondary-text">{email}</h4>
            

                <div className="flex flex-row justify-between" style={{width: "100%"}}>
                    {change ?
                        <Input placeholder="номер телефону" handler={handleInput} type={"tel"} name={"phone"} val={phone}></Input>
                    :<h5 className="secondary-text">+38{phone}</h5>
                    }
                    <div style={{width: "fic-content"}}>
                        <Button title={"Зберегти"} submit={true}></Button>
                    </div>
                </div>
            </>
            :
            <>
              <SkeletonWithShimmer w={100}></SkeletonWithShimmer>
              <SkeletonWithShimmer w={120}></SkeletonWithShimmer>
              <SkeletonWithShimmer w={160}></SkeletonWithShimmer>
              <SkeletonWithShimmer w={200}></SkeletonWithShimmer>
            </>
            }
          </div>
      </form>
    )
} 