import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer";
import { HomeSeoSchema , FooterSeoSchema } from "@/SEO/SeoSchemaOrg";
import GridProductsList from "../components/ProductsList/GridProductsList";
import { HeadMainPage } from "@/features/products/Sections";
import { HeadInfoBlock } from "@/features/products/headinfoblock/HeadInfoBlock";
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import Head from "next/head";
import { Search } from "../shared/blocks/search/SearchWrapper";
import { LinkMenu } from "@/shared/blocks/LinkMenu/linkmenu";

export async function generateMetadata({params,searchParams}) {
  const name = "Kando Одеса | Купити та продати в Одесі | Дошка оголошень Одеса";
  const description = "Kando – ваш онлайн маркетплейс в Одесі. Швидко та безкоштовно розміщуйте оголошення про продаж товарів, послуг, нерухомості та авто. Знайдіть найкращі пропозиції в Одесі!";
  const Image = `${process.env.NEXT_PUBLIC_URL}/assets/background.webp`;

  return {
    title: name,
    description: description,
    alternates: {
      canonical: "https://kando.pp.ua",
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
      title: name,
      description: description,
      url: `${process.env.NEXT_PUBLIC_URL}`,
      siteName: "kando.pp.ua",
      images: [
        {
          url: Image,
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
      title: name,
      description: description,
      images: [
        Image
      ]
    }
  }
} 


export default async function Home({searchParams}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/`,{
    next: {revalidate: 86400}
  })

  if(!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const params = await searchParams;


  const data = await res.json();

  return (
    <ContainerLanguage>
      <Head>
        <link rel="preload" as="image" href={"/assets/background.webp"} fetchPriority="high"/>
      </Head>

      <HomeSeoSchema />
      <FooterSeoSchema />
      <Header></Header>
        <MainContainer>
          <Search placeholder={"Наприклад: Квартира в центрі міста"} />
            <div className="flex flex-col" style={{backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundColor:"var(--orange)",backgroundPosition: "center",borderRadius: "1rem",backgroundImage: `url(/assets/background.webp)`,gap:"1rem"}}>
              <HeadMainPage />
              <HeadInfoBlock />
            </div>
          <LinkMenu style="section"/>
          <GridProductsList 
            currentPage={1}
            course={params.currency || "UAH"}
            withPagination={false}
            totalCount={data.data.count}
            list={data.data.items || []}
          />
        </MainContainer>
      <Footer></Footer>
    </ContainerLanguage>
  );
}
