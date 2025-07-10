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
    next: {revalidate: 600}
  })

  if(!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return (
    <ContainerLanguage>
      <Head>
        <link rel="preload" as="image" href="/assets/background.webp" fetchPriority="high"/>
      </Head>

      <HomeSeoSchema />
      <FooterSeoSchema />
      <Header></Header>
        <MainContainer>
          <Search placeholder={"Введіть назву товару або послуги..."}></Search>
            <div className="flex flex-col" style={{backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundColor:"var(--orange)",backgroundPosition: "center",borderRadius: "1rem",backgroundImage: "url('assets/background.webp')",gap:"1rem"}}>
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
