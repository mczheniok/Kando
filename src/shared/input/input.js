import styles from "./input.module.css";
import { useState  , useEffect } from "react";
import MoreArrowIcon from "@/icons/morearrow.svg";

export const InputHeader = ({ text }) => <h3 className={styles.HeaderText} >{text}</h3>

export function SelectList({arr,formDataRef,name,type=false,state,setState=() => {}}) {
    const [selected,setSelected] = useState(arr[0] || state || formDataRef[name]);
    const [visible,setVisible] = useState(false);

    const handleClick = (ind) => {
        const value = arr[ind];
        setSelected(value);

        console.log(formDataRef);

        if(type) {
            formDataRef[name] = ind;
            setState(ind);   
        } else {
            formDataRef[name] = value;
            setState(value);   
        }
    }


    useEffect(() => {
        setSelected(state || arr[0]);
    },[arr])

    return (
        <div className={`${styles.Input} ${styles.InputList}`} onClick={() => setVisible(!visible)}>
            <span className="flex flex-row align-center justify-between h3-text" style={{color: "var(--secondary-text)",width: "100%"}}>
                {selected || state}
                <MoreArrowIcon width={33} height={33} alt="More arrrow icon" style={{transition: "transform 0.2s ease",transform: `rotate(${visible?"90":"0"}deg)`}}></MoreArrowIcon>
            </span>
            <ul className={styles.DropList} style={{visibility: visible?"visible":"hidden",opacity: `${Number(visible)}`}}>
                {arr.map((el,ind) => {
                    return (
                        <li className={styles.DropListEntity} key={`drop-list-el-${ind}`} onClick={() => handleClick(ind)}>
                            <h3>{el}</h3> 
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export function InputContainer({type=2,children,text}) {
    const classNames = [
        styles.InputContainer33,
        styles.InputContainer50,
        styles.InputContainer100
    ];
    
    return (
        <div className={`${classNames[type]} flex flex-col`}>
            <InputHeader text={text} />
            {children && children}
        </div>
    )
}

export function Input({type=false,placeholder,name,handler,ref=null}) {
    return (
        <input 
            name={name} 
            ref={ref}
            onInput={handler} 
            className={`${styles.Input} h3-text`} 
            placeholder={placeholder} 
            type={type ? "text" : "text"} 
        />
    )
}


export function InputFromTo({from,to,type="number",text}) {
    return (
        <div className="flex flex-col" style={{width: "calc(33% - 2rem)"}}>
            <InputHeader text={text} />
            <div className="flex flex-row" style={{width: "100%"}}>
                <input type={type} className={styles.Input} style={{width: "50%"}} placeholder={from}></input>
                <input type={type} className={styles.Input} style={{width: "50%"}} placeholder={to}></input>
            </div>
        </div>  
    )
}


export function InputDate({name,handler=() => {},ref}) {
    return <input 
          name={name} 
          ref={ref}
          onInput={handler}
          className={styles.Input}
          style={{fontSize: "none",padding: "none"}}   
          type={"date"} 
    />
}


export function InputArea({name,handler = () => {},ref,placeholder}) {
    const onPaste = (e) => {
        const TextArea = e.target;
        
        setTimeout(() => {
            const prevHeight = TextArea.style.height;
    
            TextArea.style.height = "auto";
            const newHeight = TextArea.scrollHeight + "px";
    
            TextArea.style.height = prevHeight;
    
            requestAnimationFrame(() => {
                TextArea.style.transition = 'height 0.5s ease';
                TextArea.style.height = newHeight;
            });
        }, 0);
    }

    return (
        <textarea onPaste={onPaste} minLength={40} maxLength={3000} ref={ref} name={name} placeholder={placeholder} className={styles.InputArea} onChange={handler} />
    )
}