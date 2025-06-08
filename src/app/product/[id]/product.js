  "use client"
  import usePageRender from "@/shared/hooks/usePageRender";
  import { useRef, useState } from "react";
  import { InfoContainer } from "@/components/Containers/container";
  import ProductNavigation from "@/components/Navigation/ProductNavigation";
  import { ProductImageSection } from "@/components/Image/Image";
  import { ProductInfoSection } from "@/components/Products/info";
  import { ProductSellerInfo } from "./sellerInfo";
  import { LazyVideoSection } from "@/components/lazy";
  import { LazySpecifications } from "@/components/lazy";
  import { LazyReviewsSection } from "@/components/lazy";
  import { useEffect } from "react";


    const listInfoPages = [
        {title: "головна",id: "#main"},
        {title: "Характеристики",id: "#specifications"},
        {title: "Відгуки",id: "#reviews"},
        {title: "Відео Огляд",id: "#video"},
        {title: "Опис",id: "#description"}
  ]

    const Ratings = [
      {
        "color": "green",
        "stars": 5,
        "date": "2025-02-20",
        "text": "Чудовий товар! Все працює бездоганно, дуже задоволений покупкою."
      },
      {
        "color": "red",
        "stars": 2,
        "date": "2025-02-18",
        "text": "Не відповідає опису. Прибув пошкоджений, але обслуговування було швидким."
      },
      {
        "color": "blue",
        "stars": 4,
        "date": "2025-02-15",
        "text": "Добрий товар, але злегка затримали доставку. Все інше сподобалося."
      },
      {
        "color": "yellow",
        "stars": 3,
        "date": "2025-02-10",
        "text": "Середній товар, очікував кращої якості за таку ціну."
      },
      {
        "color": "green",
        "stars": 5,
        "date": "2025-02-05",
        "text": "Прекрасне обслуговування, доставка швидка, все відповідає опису. Рекомендую!"
      }
  ]

    const TableList = [
      {key: "Екран",value: "144hz"},
      {key: "память",value: "128gb"},
      {key: "Пошук",value: "none ulllka sodif  дфілвоа ліва длфіва w"},
      {key: "None alskdf loiweur",value:"lorelka sdlk laoiweur asldfkj asldkfj askdfj ll;askjd flkasdflk ja;sldkjf laskdfal;skdjflaskd fjlsakдфліо вадл фівадфлоы вдалфыва"}
  ]

  export function InfoPagination({obj}) {
    const Reviews = "4000"
    const { image_array, name , price , last_price , category , location  , subcategory, creator_id , id} = obj
    
    const infoRef = useRef(null);
    const [activePage,setPage] = usePageRender(infoRef);
    const type = JSON.parse(location).length === 2;
    console.log(subcategory);
    
    const main = () => {
      return (
        <InfoContainer>
          <ProductImageSection list={image_array}></ProductImageSection>
            <ProductInfoSection subcategory={subcategory} categories={category} list={image_array} type={type} title={name} Price={price} LastPrice={last_price} Reviews={Reviews} Images={image_array}></ProductInfoSection>
          <ProductSellerInfo anoncement={{subcategory,show: false}} product_id={id} type={type} userId={creator_id} categories={category} position={JSON.parse(location)}></ProductSellerInfo>
        </InfoContainer>
      );
    }

  const videoPage = () => <LazyVideoSection VideoId={"jE7bMW_JPJs"}></LazyVideoSection>

  const reviewsSection = () => <LazyReviewsSection Ratings={Ratings}></LazyReviewsSection>
  const specificationsSection = () => {
    return (
      <section className="flex flex-col" id="specifications">
        <h1>Характеристики</h1>
        <LazySpecifications TableList={TableList}></LazySpecifications>
      </section>
    );
  }

  const pages = [
    main,
    videoPage,
    reviewsSection,
    specificationsSection
  ];
    
  const CurrentPage = () => {
    return pages[activePage]?.();
  }

  useEffect(() => {
    const a = () => {
      try {
        const lastcheck = JSON.parse(localStorage.getItem("lastcheck"));
        let data =  Array.isArray (lastcheck) ? lastcheck : [];
    
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


  