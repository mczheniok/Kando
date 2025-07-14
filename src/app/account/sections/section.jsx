"use client"
import { useState , useEffect } from "react"
import styles from "../account.module.css"


export const SectionHeader = ({text}) => (
    <div className="flex flex-col align-center">
        <h3 style={{color: "#374151",fontWeight: "700",width: "100%",paddingBottom: "1rem",borderBottom: "solid var(--orange) 3px"}}>{text}</h3>
    </div>
)

export const SectionContainer = ({children,headerText}) => (
    <div className="flex flex-col" style={{marginTop: '2rem',width: '100%',padding: "0rem"}}>
        <SectionHeader text={headerText} />
        {children && children}
    </div>  
)

export function CreateNewAnnouncement({ handler, category }) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    import("@/config").then(mod => {
      setCategories(mod.objectInfoCategories);
    });
  }, []);

  if (!categories) return <div style={{width: "100%",minHeight: "400px"}}>🚀 Загрузка...</div>;

  return (
    categories[category]?.map((el, ind) => (
      <SectionContainer headerText={el.title} key={`section-category-el-${ind}`}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,calc(50% - 2rem))", gap: "2rem" }}>
          {el.arr.map((text, i) => (
            <label key={`check-box-el-${i}`} className="flex flex-row align-center">
              <input
                onChange={handler}
                value={text}
                type="checkbox"
                style={{ border: "solid var(--border) 1px", width: "33px", height: "33px" }}
              />
              <h3 style={{ color: "#374151", fontWeight: "700" }}>{text}</h3>
            </label>
          ))}
        </div>
      </SectionContainer>
    ))
  );
}




export function Selectlist() {
    const arr = ["Нерухомість","Одяг"];
    const [select,setSelect] = useState(arr[0]);

    return (
        <div style={{position: "relative"}}>
            <div className={`${styles.AccountInput} flex flex-row`} style={{width: "100%"}}>{select}</div>
            <div className="flex flex-col align-center" style={{position: 'absolute',height: "100px",background: "green",width: "100%",top: "100%",left: "0"}}>
                {arr.map((el,ind) => {
                    return <div style={{width: "100%",height:"40px",background: "var(--secondary)",color: "var(--orange)"}} onClick={_ => setSelect(arr[ind])} key={`select-el-${ind}`}>{el}</div>
                })}
            </div>
        </div>
    )
}


const Page2 = () => {
    const [file,setFile] = useState({
        banner: "/assets/noimage.webp",
        logo: "/assets/noimage.webp",
        shopName: "/assets/noimage.webp"
    })


    const click = (e) => document.getElementById(`${e.target.id}Input`).click()

    const ShopStats = [
        {title: "44 товари",src: "/icons/product.svg"},
        {title: "З нами Вже 10 років",src: "/icons/time.svg"},
    ]


    const handelFile = (file) => {
        const target = document.getElementById(file.target.name)
        const url = URL.createObjectURL(file.target.files[0])

        target.style.border = "none";
        


        setFile(f => ({
            ...f,
            [file.target.name]: url   
        }))
    }

    return (
    <>
        <form style={{height: "fit-content"}} className="flex flex-col">
            <Image width={400} className={styles.ShopBanner} style={{display: !file.banner?"none":""}} height={400} src={file.banner} alt="Banner Image"></Image>  
            <div id="banner" className={`${styles.ShopBanner} flex flex-col align-center justify-center`} style={{height: "400px",display: file.banner?"none":""}} onClick={click}>
                <h3 className="accent-text">Your Banner</h3>
            </div>
            <input type="file"  name="banner" onChange={handelFile} style={{display: "none"}} id="bannerInput"></input>
            <RowBlock>
                <div>
                    <Image src={file.logo} className="circle" style={{border: "dotted var(--orange) 2px",display: !file.logo?"none": ""}} alt="Shop Logo" width={100} height={100}></Image>    
                    <div className="circle flex flex-col align-center justify-center" style={{border: "dotted var(--orange) 2px",width: 100,height: 100,display: file.logo?"none":""}} onClick={click} id="logo">
                        <h3 className="accent-text">Logo</h3>
                    </div>
                    <input style={{display:"none"}} type="file" name="logo" onChange={handelFile} id="logoInput"></input>
                </div>
                <div className="flex flex-col align-start">
                    <input type="text" className="h1-text" style={{border: "none",borderBottom: "var(--standart-border)"}} placeholder="Shop Name"></input>
                    <div className="flex">
                        <Image src={"/icons/star.svg"} alt="star svg" width={22} height={22}></Image>
                        <h3>3.0</h3>
                        <h3 style={{color: 'var(--gray)',fontWeight:"500"}}>(124 відгуки)</h3>
                    </div>
                    <ul className="flex flex-row flex-wrap">
                        {ShopStats.map((el,ind) => {
                            return <li key={`shop-header-info-el-${ind}`} className="flex" style={{gap: ".4rem"}}>
                                <Image width={22} height={22} alt="Header Statistic Icon" src={el.src}></Image>
                                <h3 style={{color: "var(--gray)",fontWeight: "500"}}>{el.title}</h3>
                            </li>
                        })}
                    </ul>
                </div>
            </RowBlock>
        </form>
        <section className="flex flex-col">
                <div className="flex flex-col">
                    <RowBlock>
                        <h1>перегляди</h1>
                    </RowBlock>
                    <SalesChart></SalesChart>
                </div>
                <div style={{borderBottom: "var(--standart-border)"}}>
                    <RowBlock>
                        <h1>перегляди з</h1>
                    </RowBlock>
                    <CircleGraphic></CircleGraphic>
                </div>
        </section>
    </>    
)
}