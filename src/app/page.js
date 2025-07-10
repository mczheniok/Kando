import Header from "@/shared/blocks/Header"
import Search from "@/shared/blocks/search/Search";
import Footer from "@/shared/blocks/Footer";
import { HomeSeoSchema , FooterSeoSchema } from "@/SEO/SeoSchemaOrg";
import GridProductsList from "@/components/ProductsList/GridProductsList";
import { HeadMainPage } from "@/features/products/Sections";
import { HeadInfoBlock } from "@/features/products/headinfoblock/HeadInfoBlock";
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import { LazyCategory } from "@/components/lazy";
import Head from "next/head";
import { unstable_cache } from "next/cache";

export async function generateMetadata({params,searchParams}) {
  const name = "Kando";
  const description = "Kando — маркетплейс оголошень в Україні: купівля, оренда, продаж товарів і послуг.";
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

const checktime = unstable_cache(
  () => {
    const now = new Date();
    const ukraineTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Kiev"}));
    const ukraineHour = ukraineTime.getHours();


    if(ukraineHour > 22 || ukraineHour < 5) {
      return true
    } else {
      return false
    }
  },["ukraine-time-check"]
  ,{revalidate: 3600,tags: ["time-check"]}
);




export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/`,{
    next: {revalidate: 600}
  })

  if(!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  const isAfterEight = await checktime();
  
  const HeadImage = isAfterEight ? "/assets/dark.webp":"/assets/background.webp";

  return (
    <ContainerLanguage>
      <Head>
        <link rel="preload" as="image" href={HeadImage} fetchPriority="high"/>
      </Head>

      <HomeSeoSchema />
      <FooterSeoSchema />
      <Header></Header>
        <MainContainer>
          <Search placeholder={"Введіть назву товару або послуги..."}></Search>
            <div className="flex flex-col" style={{backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundColor:"var(--orange)",backgroundPosition: "center",borderRadius: "1rem",backgroundImage: `url(${HeadImage})`,gap:"1rem"}}>
              <HeadMainPage />
              <HeadInfoBlock />
            </div>
          <LazyCategory></LazyCategory>
          <GridProductsList items={data.data.items}></GridProductsList>
        </MainContainer>
      <Footer></Footer>
    </ContainerLanguage>
  );
}
