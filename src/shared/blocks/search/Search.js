"use client"

import styles from "./components.module.css"
import Link from "next/link"
import { ButtonWithIcon, ButtonWithList, ButtonLazyDropList } from "../../Buttons/Buttons"
import { LanguageContenxt } from "@/components/Containers/container";
import { useContext ,useState } from "react";
import { debounce, toServer } from "@/features/functions/functions"
import { subCategoryObject } from "@/config"
import SearchIcon from "@/icons/search.svg";
import FilterIcon from "@/icons/filter.svg";
import CategoryIcon from "@/icons/category.svg";
import { categoryCONST, searchParams } from "../../../config";
import { InputContainer , Input  , SelectList } from "../../input/input";
import { useInputHandler } from "../../hooks/useInputHandler"


export default function Search({placeholder,set=() => {}}) {
    const {language} = useContext(LanguageContenxt);
    const [visible,setVisible] = useState({status: false,data: [],search: ""});
    const [paramsSearchRef,handler] = useInputHandler();
    const [visibleList,setVisibleList] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState(categoryCONST.realestate);


    const BackLightLen = (str, search) => {
        const text = str.name.split(" ");
        const sub = str.subcategory.replace(" ","").split(" ");
        let target = null;
    
        // Пошук слова, яке частково збігається з пошуком
        text.forEach((word,index) => {
            let matchLength = 0;
            for (let i = 0; i < Math.min(word.length, search.length); i++) {
                if (word[i].toLowerCase() === search[i].toLowerCase()) {
                    matchLength++;
                } else {
                    break; // зупини якщо символи перестали збігатись
                }
            }
            if (matchLength > 4 && target === null) {
                target = index;
            }
        });

        return (
            <Link href={`/product/${str.id}?search=${str.name}`} className="h3-text secondary-text flex flex-row align-baseline" style={{ gap: ".3rem" }}>
                {sub.map((el, ind) => (
                    <p key={`category-search-el-${ind}`} className="h3-text">{subCategoryObject[el]}:</p>
                ))}
                {text.map((el, ind) => (
                    <p key={`search-word-el-${ind}`} className={ind === target ? "h3-text accent-text" : "secondary-text"}>
                        {el}
                    </p>
                ))}
            </Link>
        );
    }


    const handleSearch = debounce((e) => {
        const trg = e.target.value
        if(trg.length > 2) {
            toServer(`/items/search/${trg}`,{},false)
            .then(res => {
                setVisible(() => ({data: res?.data?.names,status: true,search: trg}));
                set(res.items);
            })
            .catch(err => console.log(err));  
        } else setVisible(r => ({...r,status: false}));
    },600);

    return (
        <form className={`${styles.form} flex flex-row flex-wrap align-center`} onSubmit={(e) => {
            e.preventDefault();

            const val = e.target.search.value;
            
            if(val.length < 3) {
                return ;
            }

            const params = new URLSearchParams();

            // Додаємо лише значення, які не є undefined або null
            for (const [key, value] of Object.entries(paramsSearchRef)) {
              if (value !== undefined && value !== null) {
                params.append(key, value);
              }
            }

            const baseUrl = `/s/${val}`;
            const finalUrl = baseUrl
            window.location.pathname = finalUrl
        }}>
            <ButtonLazyDropList name={"SubCategory"} relative={false} title={language.category} Icon={CategoryIcon}>
                {(lazylist) => (
                    <div className={`${styles.dropList} flex flex-row align-center justify-around flex-wrap`}>
                        {lazylist.length !== 0 && Object.entries(lazylist).map(([key,val],ind) => {
                            return (
                                <ul className="flex flex-col" key={`categories-col-el-${ind}`}>
                                    <h2 className="accent-text">{key}</h2>
                                    {val.map((el,ind) => {
                                        return <li key={`categoryies-el-${ind}`}><Link href={"/"}>{el}</Link></li>
                                    })}
                                </ul>
                            )    
                        })}
                    </div>
                )}
            </ButtonLazyDropList>
            <div style={{flexGrow: "1",position:"relative"}}>
                <input type="search" name="search" onBlur={() => setVisible(prev => ({...prev,status: false}))} onChange={handleSearch} className={styles.search} placeholder={placeholder}></input>       
                <ul className={`${styles.SearchDropList} flex flex-col`} style={{scale: visible.status?"1":"0"}}> 
                    {visible.data?.map((el,ind) => {
                        return (
                            <li key={`search-result-el-${ind}`}>
                                {BackLightLen(el,visible.search)}
                            </li>
                        )
                    })}
                </ul>
            </div> 
            <ButtonWithIcon ariaLabel="кнопка шукати" aria submit={true} Icon={SearchIcon} title={""}></ButtonWithIcon>
            <ButtonWithList relative={false} title={language.sort} Icon={FilterIcon} click={() => setVisibleList(prev => !prev)}>
            </ButtonWithList>
            <div className={`${styles.dropList} ${visibleList?"flex":"none"} flex-row align-center flex-wrap`} style={{width: "100%",gap: "2rem",top: "105%"}}>
                    <InputContainer type={0} text={"Категорія"}>
                        <SelectList setState={setSelectedCategory} formDataRef={paramsSearchRef} arr={Object.values(categoryCONST)} name={"category"}></SelectList>
                    </InputContainer>
                    <InputContainer type={0} text="під категорія">
                        <SelectList name={"subcategory"} formDataRef={paramsSearchRef} state={selectedCategory} arr={Object.values(subCategoryObject)}></SelectList>
                    </InputContainer>
                    {searchParams.map((el,ind) => {
                        return (
                            <InputContainer type={0} key={`search-params-el-${ind}`} text={el.text}>
                                {Array.isArray(el.placeholder)?
                                    <SelectList formDataRef={paramsSearchRef} name={el.name} arr={el.placeholder} ></SelectList>
                                :<Input name={el.name} placeholder={el.placeholder} handler={handler}></Input> }
                            </InputContainer>    
                        )    
                    })}
                </div>
        </form>
    )
}