import Header from  "@/shared/blocks/Header";
import Footer from "@/shared/blocks/Footer";
import Search from "@/shared/blocks/search/Search";
import { NotificationContainer } from "@/components/Notifications/notification";
import { ContainerLanguage, MainContainer} from "@/components/Containers/container";
import { notFound } from "next/navigation";
import { InfoSectionBottom } from "@/features/products/Sections";
import { InfoPagination } from "./product";


async function getData(id) {
  const res = await fetch(`http://localhost:4000/items/product/${id}`);
  if(res.ok || !res.err) {
    const info = await res.json();

    return info.data;
  }
}


export async function generateMetadata({params,searchParams}) {
  return {
    title: "Red Magic 6R",
    description: "Представляем вам шикарную игровую новинку от китайской компании ЗТЕ. Отличный, мощный гаджет прекрасно подойдёт для мобильного гейминга и работы с мощными приложениями. Стоит ли купить Nubia Red Magic 6R, соответствует ли цена качеству и где можно приобрести девайс максимально недорого? Обо всем этом вы узнаете на этой странице",
  }
}


function Info({obj,user}) {
  return (
      <InfoPagination user={user} obj={obj}></InfoPagination>
  )
}


export default async function Product({params}) {
  const { id } = await params
  const info = await getData(id);
  const user = {};

  if(info) {
    return (
        <ContainerLanguage>
          <Header></Header>
            <MainContainer>
              <Search></Search>
                <Info user={user} obj={info}></Info>
                <InfoSectionBottom text={info.description}></InfoSectionBottom>
                <NotificationContainer></NotificationContainer>
            </MainContainer>
          <Footer></Footer>
      </ContainerLanguage>
    )
  } else {
    notFound()
  }
}
