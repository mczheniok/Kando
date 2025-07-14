  "use client"
  import usePageRender from "@/shared/hooks/usePageRender";
  import { useRef, useState } from "react";
  import { InfoContainer } from "@/components/Containers/container";
  import ProductNavigation from "@/components/Navigation/ProductNavigation";
  import { ProductImageSection } from "@/components/Image/Image";
  import { ProductInfoSection } from "@/components/Products/info";
  import { ProductSellerInfo } from "./sellerInfo";
  import { LazyVideoSection } from "@/components/lazy";
  import { useEffect } from "react";


  const listInfoPages = [
    {title: "головна",id: "#main"},
    {title: "Відео Огляд",id: "#video"},
    {title: "Опис",id: "#description"}
  ]

  export function InfoPagination({obj}) {    
    const { image_array, name , product_info,  price , last_price , category , location = [] , subcategory, creator_id , id, views } = obj
    
    const infoRef = useRef(null);
    const [activePage,setPage] = usePageRender(infoRef);
    
    
    const type = JSON.parse(location).length === 2 || 0;

    const main = () => {
      return (
        <InfoContainer>
          <ProductImageSection list={image_array}></ProductImageSection>
            <ProductInfoSection id={id} subcategory={subcategory} categories={category} list={image_array} type={type} title={name} Price={price} LastPrice={last_price} Reviews={views} Images={image_array}></ProductInfoSection>
          <ProductSellerInfo 
            anoncement={{subcategory,show: false}} 
            product_id={id} 
            type={type} 
            userId={creator_id} 
            categories={category} 
            position={JSON.parse(location)}
          ></ProductSellerInfo>
        </InfoContainer>
      );
    }

  const videoPage = () => <LazyVideoSection VideoId={product_info.reviewvideo}></LazyVideoSection>

  const pages = [
    main,
    videoPage,
  ];
    
  const CurrentPage = () => {
    return pages[activePage]?.();
  }

  useEffect(() => {
    const a = () => {
      try {
        const lastcheck = JSON.parse(localStorage.getItem("lastcheck"));
        let data = Array.isArray (lastcheck) ? lastcheck : [];
    
        data = data.filter(id => id !== obj.id);
    
        const lastCheckArr = [obj.id,...data].slice(0,20);
    
        localStorage.setItem("lastcheck",JSON.stringify(lastCheckArr));
      } catch(err) {
        console.log(err)
      }
    }
    a();
  },[]);

  return (
      <section className="flex flex-col" style={{width: "100%",padding:"1rem .5rem",minHeight: "320px",overflow: "visible"}}>
        <ProductNavigation listInfoPages={listInfoPages} set={setPage} refc={infoRef}></ProductNavigation>
        <CurrentPage></CurrentPage>
      </section>
    )
  }


  