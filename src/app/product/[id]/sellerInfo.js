"use client"
import styles from "./product.module.css"
import { Listh4 } from "@/components/Lists/Lists"
import { LazyMap } from "@/components/lazy"
import { UserHeaderInfo } from "@/components/Image/Image"
import { useToServer } from "@/shared/hooks/useToServer"
import { toDate } from "@/features/functions/functions"

const Categoryies = ({list}) => {
    return (
      <Listh4 s={"category"}  list={list} className={"flex flex-row flex-wrap"}></Listh4>
    ) 
}
  

export const ProductSellerInfo = ({categories = [],userId,position,product_id,anoncement}) => {
    const [load,user] = useToServer(`/user/${userId}`,{},false,false);

    return (
      <section className={styles.SellerInfo}> 
          <article className={styles.InfoBlock} style={{marginTop: "0rem",padding:"0rem",height: "400px"}}>
            <UserHeaderInfo 
              userId={userId} 
              anoncement={anoncement} 
              product_id={product_id} 
              username={user.username} 
              subscription={`онлайн в: ${toDate(user.last_login)}`} 
              email={toDate(user.created_at)} 
              image={user.image}
              phone={user?.phone}
            ></UserHeaderInfo>
          </article>
          <article className={`${styles.InfoBlock}`} style={{overflow: "auto",padding: `${position.length === 2? "0rem":".6rem"}`}}>
            {position.length === 2?
              <LazyMap title="Ваш Будинок" position={position}></LazyMap>
            :<Categoryies list={categories}></Categoryies>}
          </article>
      </section>
    )
  }