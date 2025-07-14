"use client";

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

function MapLayout ({locationRef}) {
    const [location,setLocation] = useState([44.4727805,44.4755123]);
    

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


function Description ({descriptionRef}) {
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
            
            <InputArea name={"description"} placeholder={"Ввести опис оголошення"} handler={handleInput}></InputArea>
        </>
    )
}


const DescriptionData = ({set,ref,state,setName}) => {
    const array = Object.keys(SubCategory);
    const [select,setSelect] = state;

    return (
        <div className={`${styles.DescriptionData} flex flex-row flex-wrap`} style={{marginRight: "0rem",width: "100%"}}>
            <InputContainer require={true} type={2} text={"Назва Оголошення"}>
                <Input name={'name'} placeholder={"Назва оголошення"} handler={e => {
                    setName(e.target.value.trim());
                    set(e);
                }}></Input>
            </InputContainer> 
            <InputContainer type={1} text={"Категорія"}>
                <SelectList state={select} setState={setSelect} formDataRef={ref} arr={array} name={"category"}></SelectList>
            </InputContainer>
            <InputContainer type={1} text={"Підкатегорія"}>
                <SelectList formDataRef={ref} name={"subcategory"} type={true} arr={SubCategory[select]} ></SelectList>
            </InputContainer>  
            <InputContainer type={1} text={"Ціна"}>
                <Input name={"price"} handler={set} placeholder={"22000"}></Input>
            </InputContainer>
            {HeadInputList[select].map((el,ind) => {
                return (
                    <InputContainer key={`head-input-${ind}`} type={1} text={el.text}>
                        <SelectList name={el.name} type={true} formDataRef={ref} arr={el.placeholder}></SelectList>
                    </InputContainer>
                )
            })}
        </div>
    )
}

export default function Page() {
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
    const [productImages,setProductImages] = useState([]);
    const [load,setLoad] = useState(false);
    const fileRef = useRef(null); 


    const handleCheckBoxClick = (e) => {
        const { value , checked } = e.target;
        if(checked) {
            categories.current.push(value);
        } else {
            categories.current = categories.current.filter(item => item !== value);
        }
    }

    const handleFileInput = e => {
        const files = e.target.files
        for(let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            setProductImages(files => [...files,{
                url: url,
                file: e.target.files[i]
            }]);
        }
    }

    const handleInput = useCallback((e) => {
        const name = e.target.name;
        anoncement.current[name] = e.target.value  
    }, []);

    const handleClickImage = e => {
        setProductImages(prev => prev.filter(f => f.url !== e.target.src));
        console.log(productImages)
    }

    const handleSubmit = async e => {
            e.preventDefault(); 
            const data = new FormData();
            const {description,name,price,subcategory,info,location} = anoncement.current;
    
            delete product_info.current;


            if(productImages.length === 0) {
                return SendNotify("Не прікріплено жодної фотографії","warning")
            }

            productImages.forEach((el,_) => {
                data.append("files",el.file);
            });

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

            setLoad(true);

            await toServer("/account/products/create",{
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
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col" style={{width: "100%",padding: '1rem',marginTop: "2rem"}}>
                <SectionContainer require={true} headerText={"Основна Інформація"}>
                    <DescriptionData setName={setName} state={[category,setCategory]} ref={anoncement.current} set={handleInput}></DescriptionData>
                    <Description descriptionRef={anoncement.current}></Description>
                </SectionContainer>
                <MapLayout locationRef={anoncement.current}></MapLayout>
                <SectionContainer headerText={"Фотографії"}>
                    <div className="flex flex-row flex-wrap" style={{width: "100%"}}>
                        {productImages.map((el,ind) => {
                            return (
                                <img key={`el-in-image-${ind}`} onClick={handleClickImage} className={styles.ProductImagesInput} src={el.url} width={175} height={175} alt="product image"></img>
                            )
                        })}
                        <input multiple type="file" onChange={handleFileInput} ref={fileRef} style={{display:"none"}}></input>
                        <AddIcon alt="Add Image Icon" onClick={() => fileRef.current.click()} width={33} height={33} style={{border:"dashed var(--border) 2px",width: "175px",height: "175px",borderRadius:"1rem"}} ></AddIcon>
                    </div>
                    <h4 className="tw-secondary-text"> Додайте до 24 фотографій. Перше фото буде головним у вашому оголошенні. </h4>
                </SectionContainer>
                {categoryList[category]?.length !== 0 && (
                    <SectionContainer headerText={"Характеристики Об'єкту"}>
                        <div className="flex flex-row flex-wrap" style={{gap: "1rem 2rem",width: "100%",padding:"0rem"}}>
                            {categoryList[category].map((el,ind) => {
                                const { placeholder , text , name } = el;
                                return (
                                    <InputContainer text={text}  key={`input-container-${ind}`}>
                                        {typeof placeholder === "string"?<Input handler={handleProductInfo} placeholder={placeholder} name={name}/>
                                        :<SelectList formDataRef={product_info} name={name} arr={placeholder}/>}
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