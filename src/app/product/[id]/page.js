import Header from  "@/shared/blocks/Header";
import Footer from "@/shared/blocks/Footer";
import Search from "@/shared/blocks/search/Search";
import { NotificationContainer } from "@/components/Notifications/notification";
import { ContainerLanguage, MainContainer} from "@/components/Containers/container";
import { notFound } from "next/navigation";
import { InfoSectionBottom } from "@/features/products/Sections";
import { InfoPagination } from "./product";


async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/product/${id}`);
  if(res.ok || !res.err) {
    const info = await res.json();

    return info.data;
  }

  return null
}


export async function generateMetadata({params,searchParams}) {
  const info = await getData(params.id);

  if(!info) {
    return {
      title: "Товар не знайдено",
      description: 'Вибачте це оголошення видалено або архівовано'
    };
  }
  
  const {
    name ,
    description,
    image_array
  } = info;

  const noImage = `${process.env.NEXT_PUBLIC_URL}/assets/background.webp`;
  const firstImage = image_array?.[0]
  ? `${process.env.NEXT_PUBLIC_URL}/uploads${image_array[0]}`
  : noImage;



  return {
    title: name,
    description: description?.slice(0,160) || "Знаходь то що треба на Kando",
    openGraph: {
      title: `${name}`,
      description: description?.slice(0,160),
      url: `${process.env.NEXT_PUBLIC_URL}/product/${params.id}`,
      siteName: "Kando",
      images: [
        {
          url: firstImage,
          width: 800,
          height: 600,
          alt: name
        }
      ],
      locale: "uk-UA",
      type: "product"
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}`,
      description: description?.slice(0,160),
      images: [
        firstImage
      ]
    }
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
