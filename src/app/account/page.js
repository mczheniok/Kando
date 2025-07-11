"use client"
import Header from "@/shared/blocks/Header";
import Footer from "@/shared/blocks/Footer";
import styles from "./account.module.css";
import { debounce } from "@/features/functions/functions";
import { Button } from "@/shared/Buttons/Buttons";
import { Column } from "@/components/Columns/ColumnComponents";
import { CardBlock } from "@/components/Cards/Card";
import { 
    lazy, 
    useRef, 
    useState, 
    Suspense,
    useContext,
    createContext,
    useEffect, 
    useCallback,
} from "react";

import { useInputHandler } from "../../shared/hooks/useInputHandler"
import usePageRender from "@/shared/hooks/usePageRender";
import Loading from "@/components/loader";
import { ContainerLanguage } from "@/components/Containers/container";
import { CreateNewAnnouncement ,SectionContainer} from "./sections/section";
import { Input, InputContainer, SelectList  } from "@/shared/input/input";
import { NotificationContainer } from "@/components/Notifications/notification";
import { toServer , parseLastLogin } from "@/features/functions/functions";
import { categoryList , SubCategory } from "@/config";
import { LeftBar } from "./leftbar/leftbar";
import { useToServer } from "@/shared/hooks/useToServer";
import { HistoryPage } from "./history/history";
import { Chat, MessagesPage } from "./messages/messages";
import { MapLayout , Description } from "./newanoncement/new";

import MessagesIcon from "@/icons/messages.svg"
import HistoryIcon from "@/icons/history.svg"
import NewIcon from "@/icons/new.svg"
import AddIcon from "@/icons/add.svg";
import LinuxIcon from "@/icons/linux.svg";
import AppleIcon from "@/icons/apple.svg";
import AndroidIcon from "@/icons/android.svg";
import ChromeIcon from "@/icons/chrome.svg";
import UnknownIcon from "@/icons/linux.svg";
import { anoncementSchema } from "@/schemas/zod";


import { SendNotify } from "@/components/Notifications/notification";

import { HeadInputList, includeSearchName } from "../../config";



const UserHeaderInfo = lazy(() => import("@/features/account/userInfo/userInfoHead.js").then(module => ({ default: module.userHeadAccount })));   

const Cardsarray = [
    {title: "Повідомлення",icon: MessagesIcon,to: 3},
    {title: "Історія",icon: HistoryIcon,to: 4},
    {title: "Нове оголошення",icon: NewIcon,to: 5}
]

const UserContext = createContext(null);

function CheckPlatform(sys) {
    switch(sys) {
        case "Linux": return LinuxIcon;
        case "Unknown": return UnknownIcon;
        case "Chrome": return ChromeIcon;
        case "Apple": return AppleIcon;
        case "Android": return AndroidIcon;
        default: return UnknownIcon;
    }    
}

function CheckColor(System) {
    switch(System) {
        case "Linux": return "linear-gradient(135deg, rgb(60,179,113), rgb(46,139,87))"; // зелёный
        case "Unknown": return "linear-gradient(135deg, rgb(169,169,169), rgb(128,128,128))"; // серый
        case "Chrome": return "linear-gradient(135deg, rgb(66,133,244), rgb(52,168,83))"; // синий-зелёный
        case "Apple": return "linear-gradient(135deg, rgb(255,255,255), rgb(200,200,200))"; // бело-серый
        case "Android": return "linear-gradient(135deg, rgb(164,198,57), rgb(141,182,0))"; // ярко-зелёный
        default: return "linear-gradient(135deg, rgb(169,169,169), rgb(128,128,128))"; // если вдруг что-то неизвестное
    }
}

  
const SessionBlock = ({session}) => {
    const handleRemove = async (id) => {
        toServer(`/sessions/remove/${id}`,{
            method: "DELETE",
            headers: { "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
            credentials: "include"
        })
        .then(() => {
            document.querySelector(`[data-session-id="${id}"]`).remove();
        })
    }

    return (
        <>
            {session && session.length > 0 ? 
                session.map((el, ind) => {
                    const PlatformIcon = CheckPlatform(el.platform);

                    return (
                        <div 
                            key={`session-el-${ind}`} 
                            style={{width: "100%",background: "var(--bg-glass)",border: "solid var(--border) 1px",padding: "1rem",borderRadius: "1rem",minHeight: "150px"}} 
                            className={`${styles.SessionCard} flex flex-row`}
                            data-session-id={el.sessionId}
                        >
                            <div className="flex flex-col justify-around" style={{width: "100%"}}>
                                <div className="flex flex-row"> 
                                    <div className="flex flex-col align-center justify-center" style={{width: "75px",height: "75px"}}>
                                        <div className={`${styles.PlatformBackground} flex flex-col align-center justify-center`} style={{backgroundImage: CheckColor(el.platform)}}>
                                            <PlatformIcon width={50} height={50} ></PlatformIcon>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-around" style={{paddingBottom: "1rem",borderBottom: "solid var(--border) 1px",flexGrow: '1'}}>
                                        <h2>{el.platform}</h2>
                                        <h3>{el.platform} / {el.browser}</h3>
                                    </div>
                                </div>  
                                <div className="flex flex-row justify-between flex-wrap">
                                    <div className="flex flex-row " style={{gap: "1rem"}}>
                                        <h3 style={{minWidth: "30%",textAlign: "center",height: "fit-content",padding: "0.2rem 1rem"}}>
                                        🌍 {el.adress} / {parseLastLogin(el.lastLogin)}
                                        </h3>
                                    </div>
                                    <Button title={"Завершити"} click={handleRemove} style={"red"} clName={"flex-grow align-center justify-center"}></Button>
                                </div>
                            </div>
                        </div>
                    )
                })
            : <Loading />}
        </>
    )
}

const AccountMain = () => {
    const [visible,setVisible] = useState(false);
    const pagesListContainer = useRef(null);
    const [activePage,setActivePage] = usePageRender(pagesListContainer);
    const userData = useContext(UserContext);

    const [load,data] = useToServer("/sessions/all",{
        headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
        credentials: "include"
    },false);

    const MainPage = () => {
        return (
            <>
                <section style={{width: "100%",border: "solid var(--border) 1px",borderLeft: "none"}}>
                    <Suspense fallback={<Loading/>}> 
                        <UserHeaderInfo subscription={`план: ${userData?.subscription}`} phone={userData?.phone} image={userData?.image} email={userData?.email} username={userData?.username} ></UserHeaderInfo>    
                    </Suspense>
                </section>
                <div className={styles.cardsContainer}>
                    <section className="flex flex-row flex-wrap" style={{ width: "100%",padding: "1rem"}}>
                        {Cardsarray.map((el,ind) => {
                            return <CardBlock click={() => setActivePage(el.to)} key={`user-cards-el-${ind}`} title={el.title} Icon={el.icon} notifications={"+3"} />
                        })}
                    </section>
                </div>
                <div className="flex flex-col" style={{margin: "1rem 0rem",padding: "1rem"}}>
                    <h1>Активні Сесії</h1>
                    {load? <Loading time={500}/>:<SessionBlock session={data}></SessionBlock>}
                </div> 
            </>
        )
    }


    const Messages = () => <MessagesPage set={setActivePage}></MessagesPage> 
    const ChatMessages = () => <Chat set={setActivePage} myId={userData.id}></Chat>


    const MyProductsPage = () => {
        const [load,products] = useToServer("/account/products",{
            headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
            credentials: "include"
        },false);
        
        return (
            <>
                <div className={styles.cardsContainer}>
                    <section className="flex flex-row flex-wrap" style={{width: "100%",padding: "1rem"}}>
                        {Cardsarray.filter((_,ind) => ind !==2 ).map((el,ind) => {
                            return <CardBlock click={() => setActivePage(el.to)} key={`card-list-el-${ind}`} title={el.title} Icon={el.icon} notifications={"+3"} />
                        })}
                    </section>
                </div>
                <Column load={load} type={true} list={products}></Column>
            </>
        )
    }
    

    const pages = [
        MainPage,ArchivePage,MyProductsPage,Messages,HistoryPage,Page7,ChatMessages
    ]


    useEffect(() => {
        const chat = JSON.parse(localStorage.getItem("chat"));
    
        if (chat?.new_chat) {
          setActivePage(3); 
        } else return 
    },[])

    const СurrentPage = () => {
        return pages[activePage]?.();
    }

    return (
        <div>
            <Header></Header>
                <main className={`container ${styles.GridAccount}`}>
                    <LeftBar set={setActivePage} close={setVisible} userData={userData} ref={pagesListContainer} visible={visible}></LeftBar>
                    <button className={`${styles.Open} circle`} onClick={e => setVisible(!visible)}>
                            &gt;
                    </button>
                    <div className={`${styles.main} flex flex-col`}>
                        <СurrentPage></СurrentPage>
                    </div>
                </main>
            <Footer></Footer>
        </div>
    )
}


const ArchivePage = () => {      
    const [load,data] = useToServer("/archive/all",{
        headers: { "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
        credentials: "include"
    },false);

    return (
        <>
            <div className={styles.cardsContainer}>
                <section className="flex flex-row flex-wrap" style={{width: "100%"}}>
                    {Cardsarray.filter((_,ind) => ind !==2 ).map((el,ind) => {
                        return <CardBlock click={() => setActivePage(el.to)} key={`card-list-el-${ind}`} title={el.title} Icon={el.icon} notifications={"+3"} />
                    })}
                </section>
            </div>

            <Column load={load} type={false} list={data}></Column>
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

  

const Page7 = () => {
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

    const handleSubmit = async  e => {
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
        <>
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
                <CreateNewAnnouncement handler={handleCheckBoxClick}></CreateNewAnnouncement>
                <SectionContainer>
                    <Button disabled={load} submit={true} style={"dark"} Icon={"add"} title={"Створити Оголошення"} clName={"justify-center"}></Button>  
                </SectionContainer>
            </form>
        </>
    )
}


export default function Account() {    
    const [_,data] = useToServer("/account/me",{
        headers: {   "Authorization": `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}` },
        credentials: "include",
    },false,false);    

    return (    
        <ContainerLanguage>
            <UserContext.Provider value={data}>
                <AccountMain />
                <NotificationContainer></NotificationContainer>
            </UserContext.Provider>
        </ContainerLanguage>
    )
}
