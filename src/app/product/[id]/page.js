import Header from  "@/shared/blocks/Header";
import Footer from "@/shared/blocks/Footer";
import Search from "@/shared/blocks/search/Search";
import { NotificationContainer } from "@/components/Notifications/notification";
import { ContainerLanguage, MainContainer} from "@/components/Containers/container";
import { notFound } from "next/navigation";
import { InfoSectionBottom } from "@/features/products/Sections";
import { InfoPagination } from "./product";
import { ProductSeoSchema } from "../../../SEO/SeoSchemaOrg";

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/product/${id}`);
  if(res.ok || !res.err) {
    const info = await res.json();

    return info.data;
  }

  return null
}


export async function generateMetadata ({params,searchParams}) {
  const { id } = await params
  const info = await getData(id);

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
    alternates: {
      canonical: `https://kando.pp.ua/product/${id}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': "30",
        'max-image-preview': "large",
        'max-snippet': "150",
      },
    },
    openGraph: {
      title: `${name}`,
      description: description?.slice(0,160),
      url: `${process.env.NEXT_PUBLIC_URL}/product/${id}`,
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
      type: "website"
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
  const { id } = await params;
  const info = await getData(id);

  if(!info) return notFound();

  const {
    name,
    image_array,
    price,
    description,
    created_at
  } = info;

  
  const noImage = `${process.env.NEXT_PUBLIC_URL}/assets/noimage.webp`;


  const firstImage = image_array?.[0]
  ? `${process.env.NEXT_PUBLIC_URL}/uploads${image_array[0]}`
  : noImage;


  const productForSeo = {
    id,
    name,
    price,
    created_at,
    image: firstImage,
    description: description || "Опис продукту скоро з'явиться — слідкуйте за оновленнями",
  }


  if(info) {
    return (
      <ContainerLanguage>
          <Header></Header>
            <ProductSeoSchema product={productForSeo}/>
              <MainContainer>
                <Search></Search>
                  <Info obj={info}></Info>
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
