//************************************************************************************************/
//*************************** CONFIG FILE FOR CONST VARIABLES ************************************/
//************************************************************************************************/

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
        }
    ],
    "одежа": [
        {
            text: "Розмір одягу",
            name: "size",
            placeholder: ["XSS","XS","S","M","L","XL","XXL"]
        }
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


