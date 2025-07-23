import styles from "./input.module.css";
import { useState  , useEffect } from "react";
import MoreArrowIcon from "@/icons/morearrow.svg";

export const InputHeader = ({ text , require = false}) => {
    return (
        <h3 className={styles.HeaderText}>
            {text} 
            {require && (
                <p style={{color: "#ff7043",display: "inline",marginLeft: "1rem"}}>* Обов'язкове поле</p>
            )}
        </h3>
    )
}


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

export function InputContainer({type=2,children,text,require = false}) {
    const classNames = [
        styles.InputContainer33,
        styles.InputContainer50,
        styles.InputContainer100
    ];
    
    return (
        <div className={`${classNames[type]} flex flex-col`}>
            <InputHeader require={require} text={text} />
            {children && children}
        </div>
    )
}

export function Input({type=false,placeholder,value,name,handler,ref=null,required=false,clName}) {
    const [val,setValue] = useState(value);
    
    useEffect(() => {
        if(value !== val) setValue(value || "");
    },[value]);

    return (
        <input 
            name={name} 
            required={required}
            ref={ref}
            onChange={e => {
                handler(e);
                setValue(e.target.value);
            }} 
            value={val}
            className={`${styles.Input} h3-text ${clName}`} 
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



export function InputArea({ name, handler = () => {}, placeholder, value = "" }) {
    const [val, setVal] = useState(value);

    useEffect(() => {
        setVal(value || "");
    }, [value]); // <- следим за изменением пропса value

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
    };

    return (
        <textarea
            onPaste={onPaste}
            value={val}
            minLength={40}
            maxLength={3000}
            name={name}
            placeholder={placeholder}
            className={styles.InputArea}
            onChange={e => {
                handler(e);
                setVal(e.target.value);
            }}
        />
    );
}
