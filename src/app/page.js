import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer";
import { HomeSeoSchema , FooterSeoSchema } from "@/SEO/SeoSchemaOrg";
import { GridProductsList } from "../components/ProductsList/GridListWrapper";
import { HeadMainPage } from "@/features/products/Sections";
import { HeadInfoBlock } from "@/features/products/headinfoblock/HeadInfoBlock";
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import { HeroCategory } from "@/features/products/CategoryBlock/herocategoryblock";
import Head from "next/head";
import { Search } from "../shared/blocks/search/SearchWrapper";

export async function generateMetadata({params,searchParams}) {
  const name = "Kando";
  const description = "Kando — маркетплейс оголошень в Україні: купівля, оренда, продаж товарів і послуг.";
  const Image = `${process.env.NEXT_PUBLIC_URL}/assets/background.webp`;

  return {
    title: `${name} | Маркетплейс оголошень`,
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
      title: `${name}`,
      description: description,
      url: `${process.env.NEXT_PUBLIC_URL}`,
      siteName: "Kando",
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
      title: `${name}`,
      description: description,
      images: [
        Image
      ]
    }
  }
} 


export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/`,{
    next: {revalidate: 86400}
  })

  if(!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

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
          <HeroCategory />
          <GridProductsList 
            currentPage={1}
            withPagination={false}
            totalCount={data.data.count}
            list={data.data.items || []}
          />
        </MainContainer>
      <Footer></Footer>
    </ContainerLanguage>
  );
}
