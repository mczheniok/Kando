//************************************************************************************************/
//*************************** CONFIG FILE FOR CONST VARIABLES ************************************/
//************************************************************************************************/

import { configDotenv } from "dotenv";
configDotenv();

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL_URL;

export const categoryCONST = {
    realestate: "нерухомість",
    cloth: "одяг",
} 


export const SubCategory = {
    "нерухомість": [
        "🏢 Квартири","🛌🏿 Кімнати",
        "🏠 Будинки","⏰ Подобова оренда житла",
        "🌍 ділянка","🅿️ Гараж, паркінг",
    ],
    "одежа": [
        "👔 Чоловічий одяг", "👗 Жіночий одяг",
        "👟 Взуття", "👜 Аксесуари",
        "🧥 Верхній одяг", "🩳 Домашній одяг"
    ]
}



export const categoryList = {
    "нерухомість": [
        {
            text: "Площа, м²",
            name: "totalplace",
            placeholder: "40",
        },
        {
            text: "Рік будівництва",
            name: "yearconstruction",
            placeholder: "2007"
        },
        {
            text: "Стан",
            name: "state",
            placeholder: ["Після ремонту","Євро Ремонт","Під ремонт"]
        },
        {
            text: "Тип угоди",
            name: "typeagreement",
            placeholder: ["Оренда","Продаж","Подобова Аренда"]
        },
        {
            text: "Відео огляд",
            name: "reviewvideo",
            placeholder: "https://www.youtube.com/"
        },
        {
            text: "Працюю з рієлторами",
            name: "workwithagents",
            placeholder: ["Ні","Працюю з рієлторами"]
        },
        {
            text: "Поверх",
            name: "floor",
            placeholder: "17"
        },
        {
            text: "Район",
            name: "region",
            placeholder: ["Київскій район","Пересипський район","Приморський район","Хаджибейский район"]
        },
    ],
    "одежа": [
        {
            text: "Розмір одягу",
            name: "size",
            placeholder: ["XSS","XS","S","M","L","XL","XXL"]
        },
        {
            text: "Відео огляд",
            name: "reviewvideo",
            placeholder: "https://www.youtube.com/"
        },
        
    ]
}



// ********************************************************************************
// ****************************** language ****************************************
// ********************************************************************************


const UkraineLang = {
    language: "Мова",
    trash: "Кошик",
    likes: "Обрані",    
    i: "Я",
    sort: "Сортувати",
    category: "категорії",
    title: "Створюй разом з "
}

const EnglishLang = {
    language: "Language",
    trash: "Trash",
    likes: "Likes",
    i: "I",
    sort: "Sort",
    category: "category",
    title: "Create with a"
}


export const Language = {
    "ua": UkraineLang,
    "en": EnglishLang
}


export const subCategoryObject = {
    "apartments": "🏢 Квартири",
    "rooms": "🛌🏿 Кімнати",
    "houses": "🏠 Будинки",
    "daily": "⏰ Подобова оренда житла",
    "land": "🌍 ділянка",
    "garage-parking": "🅿️ Гараж, паркінг",
    "men-clothing": "👔 Чоловічий одяг",
    "women-clothing": "👗 Жіночий одяг",
    "shoes": "👟 Взуття",
    "accessories": "👜 Аксесуари",
    "outerwear": "🧥 Верхній одяг",
    "homewear": "🩳 Домашній одяг"
}




export const searchParams = [
    {
        text: "По площі",
        name: "totalplace",
        placeholder: [30,40,50,60,70,80,90,100],
    },
    {
        text: "Рік будівництва",
        name: "yearconstruction",
        placeholder: ["1980","1990","2000","2010","2020+"]
    },
    {
        text: "Тип будинку",
        name: "typeofhouse",
        placeholder: ["Чешка","Гостинка","Совмін","Гуртожиток"]
    },
    {
        text: "Район",
        name: "region",
        placeholder: ["Київскій район","Пересипський район","Приморський район","Хаджибейский район"]
    },
    {
        text: "Працюю з рієлторами",
        name: "workwithagents",
        placeholder: ["Всі оголошення","Працюю з рієлторами"]
    },
    {
        text: "Стан",
        name: "state",
        placeholder: ["Після ремонту","Євро Ремонт","Під ремонт"]
    },
    {
        text: "Ціна",
        name: "price",
        placeholder: ["2000","3000","4000","5000","6000","7000","8000+"]    
    },
    {
        text: "Поверх",
        name: "floor",
        placeholder: "17"
    },
]