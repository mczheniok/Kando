import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer"
import { InfoContainer, MainContainer } from "@/components/Containers/container"
import Search from "@/shared/blocks/search/Search"
import { ProductInfoSection, ProductSellerInfo } from "@/components/Products/info"
import { ProductImageSection } from "@/components/Image/Image"
import ProductNavigation from "@/components/Navigation/ProductNavigation"
import { LazyProductList , LazyVideoSection } from "@/components/lazy"
import { InfoSectionBottom } from "@/features/products/Sections"

function Info({obj}) {
  const listInfoPages = [
    {title: "Характеристики",id: "#specifications"},
    {title: "Відгуки",id: "#reviews"},
    {title: "Відео Огляд",id: "#video"},
    {title: "Опис",id: "#description"}
  ]
  
  const Reviews = "4000"
  const { Images , title , Price , LastPrice, categories} = obj
  
  console.log(Images)
  

  return (
      <InfoContainer>
          <ProductNavigation listInfoPages={listInfoPages}></ProductNavigation>
          <ProductImageSection list={Images}></ProductImageSection>
          <ProductInfoSection type={true} list={categories} title={title} Price={Price} LastPrice={LastPrice} Reviews={Reviews}></ProductInfoSection>
          <ProductSellerInfo  categories={categories}></ProductSellerInfo>
      </InfoContainer>
  )
}

export default function () {
    const dataFromServer = {
      title: "Red Magic 6R",
      description: "Представляем вам шикарную игровую новинку от китайской компании ЗТЕ. Отличный, мощный гаджет прекрасно подойдёт для мобильного гейминга и работы с мощными приложениями. Стоит ли купить Nubia Red Magic 6R, соответствует ли цена качеству и где можно приобрести девайс максимально недорого? Обо всем этом вы узнаете на этой странице.",
      listColors: [
        "green","white","yellow","black","green","white","yellow","black",
      ],
      Price: "14.000,00грн",
      LastPrice: "22.000,00грн",
      categories: [
        "alsd","laskdkfjf",
        "adsf","alksj df","128gb","144hz","8gb rom","adsf","alksj df","128gb","144hz","8gb rom","adsf","alksj df","128gb","144hz","8gb rom"
      ],
      Images: [
        "/assets/nubia0.jpg",
        "/assets/nubia1.jpg",
        "/assets/nubia2.jpg",
        "/assets/nubia3.jpg",
        "/assets/nubia1.jpg",
        "/assets/nubia1.jpg",
      ],
      Similar: [
        {img: "/assets/nubia0.jpg",id: 1,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia0.jpg",id: 2,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia0.jpg",id: 3,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia0.jpg",id: 4,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia0.jpg",id: 5,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 6,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 7,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 8,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 9,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 10,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 11,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"},
        {img: "/assets/nubia1.jpg",id: 12,title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00"}
      ]
    }


    return (
        <>
            <Header></Header>
                <MainContainer>
                    <Search></Search>
                    <Info obj={dataFromServer}></Info>
                    <InfoSectionBottom></InfoSectionBottom>
                    <LazyVideoSection VideoId={"jE7bMW_JPJs"}></LazyVideoSection>
                    <LazyProductList title={"Схожі Оголошення"} list={dataFromServer.Similar}></LazyProductList>
                    <LazyProductList title={"Останні переглянуті товари"} list={dataFromServer.Similar}></LazyProductList>
                </MainContainer>
            <Footer></Footer>
        </>
    )
}