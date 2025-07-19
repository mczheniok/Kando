"use client";

import { useToServer } from "@/shared/hooks/useToServer"
import { useSearchParams } from "next/navigation";

import { 
    useRef,
    useState,
    useEffect,
    useCallback
} from "react";

import styles from "../account.module.css";
import { InputContainer , Input , InputArea } from "../../../shared/input/input";
import { useInputHandler } from "../../../shared/hooks/useInputHandler";
import { SectionContainer , SectionHeader } from "../sections/section";
import { LazyMap } from "@/components/lazy";
import { debounce } from "@/features/functions/functions";
import { categoryList, HeadInputList, includeSearchName, SubCategory } from "../../../config";
import { SelectList } from "../../../shared/input/input";
import { CreateNewAnnouncement } from "../sections/section";
import { Button } from "../../../shared/Buttons/Buttons";
import { anoncementSchema } from "@/schemas/zod";
import { SendNotify } from "../../../components/Notifications/notification";
import { toServer } from "../../../features/functions/functions";
import AddIcon from "@/icons/add.svg"
import { ServerLoader } from "@/shared/blocks/serverLoader";

function MapLayout ({locationRef}) {
    const [location,setLocation] = useState([46.4900983,30.7400866]);

    const debounceHandleInput = debounce((e) => {
        const regex = /@([^,]+),([^,]+),([^z]+)/;
        const matches = e.target.value.match(regex);

        if(matches) {
            const latitude = matches[1];  // Широта
            const longitude = matches[2]; // Долгота
            const zoom = matches[3];      // Зум

            setLocation(() => [latitude,longitude]);
            locationRef.location = [latitude,longitude];
        }
    },300)


    const handleInputLocation = (e) => {
        debounceHandleInput(e);
    }

    return (
        <SectionContainer headerText={"Місцезнаходження"}>
            <div className="flex flex-col" style={{maxWidth: "100%",borderRadius: "1rem"}}>
                <div style={{width: "100%"}}>
                    <LazyMap height="400px" title={"ваша квартира"} position={location}></LazyMap>
                </div>

                <Input 
                    placeholder="Введіть адресу або посилання на Google Maps" 
                    type="text"
                    name={"location"}
                    handler={handleInputLocation}
                ></Input>
            </div>
        </SectionContainer>
    )
} 


function Description ({descriptionRef,value}) {
    const [length,setLength] = useState(3000);

    const handleInput = useCallback((e) => {
        const name = e.target.name;
        descriptionRef[name] = e.target.value;
        
        setLength(3000 - e.target.value.length);
    }, []);

    return(
        <>
            <div className="flex flex-row" style={{width: '100%'}}>
                <div className="flex flex-col align-start" style={{width: "100%"}}>
                    <div className="flex flex-row justify-between" style={{width: "100%"}}>
                        <h1>
                            Опис
                        </h1>
                        <h1>
                            залишилось символів: {length}
                        </h1>
                    </div>
                </div>
            </div>
            
            <InputArea name={"description"} value={value} placeholder={"Ввести опис оголошення"} handler={handleInput}></InputArea>
        </>
    )
}


const DescriptionData = ({set,ref,state,setName,prev,subcategory,headList}) => {
    const array = Object.keys(SubCategory);
    const [select,setSelect] = state;

    return (
        <div className={`${styles.DescriptionData} flex flex-row flex-wrap`} style={{marginRight: "0rem",width: "100%"}}>
            <InputContainer require={true} type={2} text={"Назва Оголошення"}>
                <Input value={prev?.name || ""} name={'name'} placeholder={"Назва оголошення"} handler={e => {
                    setName(e.target.value.trim());
                    set(e);
                }}></Input>
            </InputContainer> 
            <InputContainer type={1} text={"Категорія"}>
                <SelectList  state={select} setState={setSelect} formDataRef={ref} arr={array} name={"category"}></SelectList>
            </InputContainer>
            <InputContainer type={1} text={"Підкатегорія"}>
                <SelectList formDataRef={ref} name={"subcategory"} state={subcategory[0]} setState={subcategory[1]} type={true} arr={SubCategory[select]} ></SelectList>
            </InputContainer>  
            <InputContainer type={1} text={"Ціна"}>
                <Input value={prev?.price || ""} name={"price"} handler={set} placeholder={"22000"}></Input>
            </InputContainer>
            {HeadInputList[select].map((el,ind) => {
                return (
                    <InputContainer key={`head-input-${ind}`} type={1} text={el.text}>
                        <SelectList state={headList?.[el.name] || ""} name={el.name} type={true} formDataRef={ref} arr={el.placeholder}></SelectList>
                    </InputContainer>
                )
            })}
        </div>
    )
}


export default function EditPage({}) {
    const searchParams = useSearchParams();
    const relId = searchParams.get("rel");

    const [_,prevProduct] = useToServer(`/items/product/${relId}`,true,false);

    const anoncement = useRef({
        name: "",
        price: 0,
        description: "",
        subcategory: "",
        info: {},
        location: []
    });
    const [name,setName] = useState(anoncement.current.name);
    const [category,setCategory] = useState("Нерухомість");
    const categories = useRef([]);
    const [product_info,handleProductInfo] = useInputHandler({})
    const [subcategory,setSubcategory] = useState();
    const [load,setLoad] = useState(false);
    const [productInfo,setProductInfo] = useState({});


    const handleCheckBoxClick = (e) => {
        const { value , checked } = e.target;
        if(checked) {
            categories.current.push(value);
        } else {
            categories.current = categories.current.filter(item => item !== value);
        }
    }



    const handleInput = useCallback((e) => {
        const name = e.target.name;
        anoncement.current[name] = e.target.value  
    }, []);

    const handleSubmit = async e => {
            e.preventDefault(); 
            const data = new FormData();
            const {description,name,price,subcategory,info,location} = anoncement.current;
    
            delete product_info.current;

            function arraysEqual(a, b) {
                return a.length === b.length && a.every((val, i) => val === b[i]);
            }
            
            const result = anoncementSchema.safeParse({
                ...anoncement.current,
                categories: categories.current,
                price: parseInt(anoncement.current.price),
                category
            });


            if(!result.success) {
                const err = result.error.errors[0].message

                return SendNotify(err,"warning");
            }

            data.set("description",description);

            if(!arraysEqual(location,[44.4727805,44.4755123])) {
                data.set("location",JSON.stringify(location)); 
            } else {
                data.set("location",JSON.stringify([]));
            }
            data.set("price",price);
            data.set("name",name);
            data.set("subcategory",subcategory);
            data.set("info",JSON.stringify(info));
            data.set("categories",JSON.stringify(categories.current));
            data.set("type",category);
            data.set("product_info",JSON.stringify(product_info));
            data.set("id",relId);

            setLoad(true);

            await toServer("/account/products/edit",{
                method: "POST",
                body: data,
                credentials: "include"
            })
            
            setLoad(false);
    }


    const debouncedSearch = debounce((searchName) => {
        Object.entries(includeSearchName).forEach(([key,value]) => {
            if (searchName.toLowerCase().includes(key)) {
                setCategory(value[0]);
                anoncement.current.typeagreement = value;
            }
        });
    }, 600);
    

    useEffect(() => {
        if (prevProduct && Object.keys(prevProduct).length > 0) {
            // Обновляем данные объявления
            anoncement.current = {
                name: prevProduct.name || "",
                price: prevProduct.price || 0,
                description: prevProduct.description || "",
                subcategory: prevProduct.subcategory || "",
                info: prevProduct.info || {},
                location: prevProduct.location || []
            };
            
            // Обновляем состояние
            setName(prevProduct.name || "");
            setCategory(prevProduct.type || "Нерухомість");
            
            // Если есть категории в prevProduct
            if (prevProduct.category) {
                categories.current = prevProduct.category;

                categories.current.map(cat => {
                    const input = document.querySelector(`input[value="${cat}"]`);
                    if(input) input.checked = true; 
                    console.log(input);
                })
            }  

            if(prevProduct.subcategory) {
                setSubcategory(prevProduct.subcategory);
            }

            if(prevProduct.product_info) {
                setProductInfo(prevProduct.product_info);
            }

        }
    }, [prevProduct]);


    // В компоненте:
    useEffect(() => {
        if (name) {
            debouncedSearch(name);
        }
    }, [name]);


    useEffect(() => {
        anoncement.current.info = categoryList[category].reduce((acc, el) => {
            acc[el.name] = "";
            return acc;
        }, {});
    }, [category]);


    if (!prevProduct || Object.keys(prevProduct).length === 0) {
        return <ServerLoader height="700px" />;
    }

    const prevHead = {
        name: prevProduct.name,
        price: prevProduct.price
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col" style={{width: "100%",padding: '1rem',marginTop: "2rem"}}>
                <SectionContainer require={true} headerText={"Основна Інформація"}>
                    <DescriptionData headList={productInfo} subcategory={[subcategory,setSubcategory]} prev={prevHead} setName={setName} state={[category,setCategory]} ref={anoncement.current} set={handleInput}></DescriptionData>
                    <Description value={prevProduct?.description} descriptionRef={anoncement.current}></Description>
                </SectionContainer>
                <MapLayout locationRef={anoncement.current}></MapLayout>
                {categoryList[category]?.length !== 0 && (
                    <SectionContainer headerText={"Характеристики Об'єкту"}>
                        <div className="flex flex-row flex-wrap" style={{gap: "1rem 2rem",width: "100%",padding:"0rem"}}>
                            {categoryList[category].map((el,ind) => {
                                const { placeholder , text , name } = el;

                                console.log(productInfo);

                                return (
                                    <InputContainer text={text}  key={`input-container-${ind}`}>
                                        {typeof placeholder === "string"?<Input value={productInfo?.[name] || ""} handler={handleProductInfo} placeholder={placeholder} name={name}/>
                                        :<SelectList state={productInfo?.[name] || ""} formDataRef={product_info} name={name} arr={placeholder}/>}
                                    </InputContainer>
                                );
                            })}
                        </div>
                    </SectionContainer>
                )}
                <CreateNewAnnouncement category={category} handler={handleCheckBoxClick}></CreateNewAnnouncement>
                <SectionContainer>
                    <Button disabled={load} submit={true} style={"dark"} Icon={"add"} title={"Створити Оголошення"} clName={"justify-center"}></Button>  
                </SectionContainer>
            </form>
        </div>
    )
}


