import Header from "@/shared/blocks/Header"
import Search from "@/shared/blocks/search/Search";
import Footer from "@/shared/blocks/Footer";
import GridProductsList from "@/components/ProductsList/GridProductsList";
import { HeadMainPage } from "@/features/products/Sections";
import { HeadInfoBlock } from "@/features/products/headinfoblock/HeadInfoBlock";
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import { LazyCategory } from "@/components/lazy";

export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL_URL);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/`,{
    next: {revalidate: 600}
  })

  if(!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json()

  return (
    <ContainerLanguage>
      <link rel="preload" as="image" href="/assets/background.webp" fetchPriority="high"/>
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
