import styles from "./sectionsProducts.module.css"
import { UserHeaderInfo } from "@/components/Image/Image"
import SelectImage from "../Select/SelectImage"
import { Listh4 } from "../Lists/Lists"
import { LazyMap } from "../lazy"
import { ButtonShare } from "@/features/client/client"
import { ButtonWithIcon } from "@/shared/Buttons/Buttons"

export const ProductSellerInfo = ({categories = [],user,type="product",position}) => {
  return (
    <section className={styles.SellerInfo}> 
        <article className={styles.InfoBlock} style={{marginTop: "0rem",padding:"0rem"}}>
          <UserHeaderInfo username={user.username}></UserHeaderInfo>
        </article>
        <article className={`${styles.InfoBlock}`} style={{overflow: "auto",padding: `${type ==="realestate"? "0rem":".6rem"}`}}>
          {type === "realestate"?
          <LazyMap title="Ваш Будинок" position={position}></LazyMap>
          :<Categoryies list={categories}></Categoryies>}
        </article>
    </section>
  )
}


function PriceBlock({Price,LastPrice}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap align-baseline">
          <h1>{Price}</h1>
          <h3 className="through-text">{LastPrice}</h3>
          <h3 className="ackent-text">-84%</h3>
      </div>
    </div>
  )
}


const Categoryies = ({list}) => {
  return (
    <Listh4 s={"category"}  list={list} className={"flex flex-row flex-wrap"}></Listh4>
  ) 
}



export function ProductsellerInfo({categories = [],children,type="neryhomist"}) {
    return (
      <section className={styles.SellerInfo}>
        <article className={styles.InfoBlock} style={{marginTop: "0rem"}}>
          {categories.length > 0 || type !== "neryhomist"?
          <Categoryies list={categories}></Categoryies>
          :<UserHeaderInfo userName={"Zhen"}></UserHeaderInfo>
          }
        </article>
        <article className={`${styles.InfoBlock}`} style={{overflow: "auto",padding: '0rem'}}>
            {children}
        </article>
      </section>
    )
  }

export function ProductInfoSection({title,Price,LastPrice,categories,list,Reviews,type="product"}) {

  return (
    <section className="flex flex-col flex-wrap" style={{maxHeight: "400px"}}>
      <div className="flex flex-row align-center justify-between">
        <h1>{title}</h1>
        <ButtonShare></ButtonShare>
      </div>
      <PriceBlock Price={Price} LastPrice={LastPrice}></PriceBlock>
        <div className="flex flex-row align-center flex-wrap">
            <h4>⭐</h4>
            <h4>{4.5}</h4>
            <h4>{Reviews} Відгуків</h4>
            <h4 className="sels">10,000+ продажів</h4>
        </div>
        {<article className={`${styles.InfoBlock}`} style={{overflowY: "auto",maxHeight: 'auto',border: "none",padding: "0rem"}}>
          {type?
          <Categoryies list={categories}></Categoryies>
          :<SelectImage list={list}></SelectImage>}
        </article>}
    </section>
  )
}

