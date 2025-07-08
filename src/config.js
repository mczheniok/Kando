//************************************************************************************************/
//*************************** CONFIG FILE FOR CONST VARIABLES ************************************/
//************************************************************************************************/

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL_URL || "http://localhost:4000";

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

export const subCategoryUrl = {
    "нерухомість": [
        "apartments","rooms",
        "houses","daily",
        "land","garage",
    ],
    "одежа": [
        "men", "women",
        "shoes", "accessories",
        "outerwear", "homewear"
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
            text: "Площа Кухні, м²",
            name: "kitchenplace",
            placeholder: "15"
        },
        {
            text: "Рік будівництва",
            name: "yearconstruction",
            placeholder: "2007"
        },
        {
            text: "Ремонт",
            name: "state",
            placeholder: ["Євро Ремонт","Після ремонту","Під ремонт","Косметичний Ремонт","Авторський Ремонт"]
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
            text: "Поверховість",
            name: "totalfloor",
            placeholder: "17"
        },
        {
            text: "Район",
            name: "region",
            placeholder: ["Київскій район","Пересипський район","Приморський район","Хаджибейский район"]
        },
        {
            text: "Планування",
            name: "objectplane",
            placeholder: ["Роздільно","Суміжно Прохідна","Студія","Смарт","Пентхаус"]
        },
        {
            text: "Санвузол",
            name: "bathroom",
            placeholder: ["Роздільний","Суміжний","2 і більше"]
        },
        {
            text: "Опалення",
            name: "heating",
            placeholder: ["Централізоване","Власна котельня","Індивідуальне Газове","Індивідуальне Електро","Інше"]
        }
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


export const HeadInputList = {
    "нерухомість": [
        {
            text: "Тип угоди",
            name: "typeagreement",
            placeholder: ["Оренда","Долгосрочна Оренда","Продаж"]
        },
        {
            text: "Кількість Кімнат",
            reqiure: true,
            name: "totalrooms",
            placeholder: ["1","2","3","4","5","5+"]
        }
    ],
    "одежа": [
        {
            text: "Розмір одягу",
            name: "size",
            placeholder: ["XSS","XS","S","M","L","XL","XXL"]
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
        placeholder: ["Київській район","Пересипський район","Приморський район","Хаджибейьский район"]
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
        placeholder: "10"
    },
]

export const includeSearchName = {
    "сдам": ["нерухомість","Долгосрочна Оренда"]
}