"use client"

import styles from "../description.module.css";
import { ButtonWithIcon } from "@/shared/Buttons/Buttons";
import { Fragment , useState } from "react"

import MoreArrowIcon from "@/icons/morearrow.svg";
import { objectInfoCategories } from "@/config";

const FormatedText = ({ text }) => {
    if (!text?.trim()) return null;

    const lines = text.split("\n").filter(line => line.trim().length > 0);
  
    return (
      <>
        {lines.map((line, index) => (
          <Fragment key={`info-line-${index}`}>
            <p className={`${styles.descriptionItem} h3-text`}>{line.trim()}</p>
            {index < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </>
    );
};

const DetailItem = ({type = "Тип",text}) => {
    


    return (   
        <div className={`${styles.detailItem} flex flex-row justify-between align-center`} >
            <p className={`text-small ${styles.descriptionItem}`}>{type}: </p>
            <p className="text-small">{text}</p>
        </div>
    )
}


export function Desciption({description}) {
    const [descriptionFull,setDescriptionFull] = useState(description.slice(0,300));

    const handleMoreClick = () => {
        setDescriptionFull(prev => {
            if(prev.length > 300) return prev.slice(0,300);
            else return description;
        })
    }

    return (
        <div className="flex flex-col">
            <h3>Опис</h3>
            <div className="flex flex-col" style={{gap: ".1rem"}}>
                <FormatedText text={descriptionFull}></FormatedText>
                {description.length > 300 && (
                    <div style={{marginTop: "1rem"}} className="flex flex-row flex-grow align-center justify-center">
                        <ButtonWithIcon clName={"justify-center flex-grow"} click={handleMoreClick} Icon={MoreArrowIcon}/>
                    </div>  
                )}
            </div>
        </div>
    )
}



export function Specifications({array,category}) {
    const [specificationsFull,setSpecificationsFull] = useState(array.slice(0,5));

    const handleMoreClick = () => setSpecificationsFull(prev => {
        if(prev.length > 5) return prev.slice(0,5);
        else return array;
    })


    return (
        <div className="flex flex-col" style={{transition: ".3s"}}>
        <h3>Характеристики</h3>
            <div className="flex flex-row flex-wrap" style={{marginTop: "2rem"}}>
                {specificationsFull.map((el,ind) => {
                    return (
                        <DetailItem text={el} key={el}></DetailItem>
                    )
                })}
            </div>
            {array.length > 5 && (
                <ButtonWithIcon clName={"justify-center flex-grow"} click={handleMoreClick} Icon={MoreArrowIcon}/>
            )}
        </div>
    )
}