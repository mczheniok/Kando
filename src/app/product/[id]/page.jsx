import Header from "../../../shared/blocks/Header";
import Footer from "../../../shared/blocks/Footer";
import Search from "../../../shared/blocks/search/Search";
import { Suspense } from "react";
import { ProductSeoSchema } from "../../../SEO/SeoSchemaOrg";
import { MainContainer } from "../../../components/Containers/container";
import { ServerLoader } from "@/shared/blocks/serverLoader";
import { NotificationContainer } from "@/components/Notifications/notification";
import { ServerInfo } from "./productSection/serverInfo";
import { UserInfo } from "./productSection/userSection";
import { notFound } from "next/navigation";
import { BreadCrumbs } from "@/shared/blocks/BreadCrumbs/BreadCrumbs";
import { subCategoryUrl, subCategoryUrls } from "@/config";


function Information() {
  return (
    <section style={{width: "100%",padding: "1rem",borderRadius: "1rem",border: "solid var(--bg-info--border) 2px",background: "var(--bg-info)"}} className="flex flex-col align-start">
      <span style={{fontWeight: "600",color: "#856404"}} className="h3-text">⚠️ Безпека угод</span>
      <p className="h3-text" style={{fontWeight: "200",color: "#856404",lineHeight: "1.4"}}> 
        Перевіряйте товар перед купівлею. Зустрічайтесь у безпечних місцях. Не передавайте гроші наперед. Kando не несе відповідальності за угоди між користувачами.
      </p>
    </section>
  )
}

async function getData(id) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/product/${id}`);
      
      if(!res.ok) return null;

      const info = await res.json();

      return info.data;
    }
    catch(err)  {
      return null;
    }
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


export default async function Page({params}) {
    const { id } = await params;
    let info; 
    
    try {
      info = await getData(id);
    } catch(err) {
      return (
        <div className="flex flex-col align-center justiyf-center flex-grow">
          <h1>Нажаль Виникла помилка при загрузці цього оголошення</h1>
        </div>
      )
    }

    if(!info) return notFound();
  
    const {
      type,
      name,
      price,
      location,
      created_at,
      creator_id,
      image_array,
      description,
      subcategory,
    } = info;
    
    const noImage = `${process.env.NEXT_PUBLIC_URL}/assets/noimage.webp`;
  
  
    const firstImage = image_array?.[0]
    ? `${process.env.NEXT_PUBLIC_URL}/uploads${image_array[0]}`
    : noImage;
  
    const listUrls = Object.entries(subCategoryUrls)

    const enCategory = listUrls.find(([_,value]) => value === type);
    const enSubcategory = listUrls.find(([_,value]) => value === subcategory);
  
    const productForSeo = {
      id,
      name,
      price,
      created_at,
      image: firstImage,
      description: description || "Опис продукту скоро з'явиться — слідкуйте за оновленнями",
    }
    
    return (
        <div>
            <Header></Header>
                <ProductSeoSchema product={productForSeo}/>
                  <MainContainer>
                    <Suspense fallback={<ServerLoader/>}>
                        <Search></Search>
                    </Suspense>
                    <BreadCrumbs baseUrl={`${[enCategory[0]]}/${enSubcategory[0]}`} />
                    <ServerInfo images={image_array} data={info}></ServerInfo>
                    <Suspense fallback={<ServerLoader height={"300px"}/>}>
                      <UserInfo userId={creator_id} location={location}></UserInfo>
                    </Suspense>
                    <Information></Information>
                  <NotificationContainer></NotificationContainer>
                </MainContainer>
            <Footer></Footer>
        </div>
    )
}