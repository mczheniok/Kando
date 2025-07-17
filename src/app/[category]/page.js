import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer"
import { ContainerLanguage, MainContainer } from "@/components/Containers/container"
import { Search } from "../../shared/blocks/search/SearchWrapper";
import { GridProductsList } from "../../components/ProductsList/GridListWrapper";
import { subCategoryUrl, subCategoryUrls } from "../../config"
import { BreadCrumbs } from "@/shared/blocks/BreadCrumbs/BreadCrumbs";
import { CategorySchema } from "@/SEO/SeoSchemaOrg";
import { notFound } from "next/navigation";

export const revalidate = 86400; // обновление раз в сутки

export async function generateStaticParams() {
  const paths = [];

  Object.keys(subCategoryUrl)
  .map((category) => {
    paths.push({category});
  });

  return paths;
}

function getCategoryName(category) {
  return subCategoryUrls[category];
}



export async function generateMetadata({ params }) {
  const { category } = await params;


  const categoryName = getCategoryName(category);

  return {
    title: `Доска оголошень категорії ${categoryName} | Kando`,
    description: `➤ Знаходьте та розміщуйте оголошення в категорії ${categoryName}. ✅ Тисячі актуальних пропозицій з цінами та фото на Kando. Заходьте!`,
    alternates: {
      canonical: `https://kando.pp.ua/${category}`
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
      title: `${category} - ${categoryName}`,
      description: `Оголошення про ${categoryName} на дошці оголошеннь Kando`,
      url: `https://kando.pp.ua/${category}`,
      images: [
        {
          url: 'https://kando.pp.ua/assets/og-category.webp', // Сделайте общее или генерируйте динамически
          width: 1200,
          height: 630,
        },
      ],
      type: 'website'
    },
    twitter: {
      card: "summary_large_image",
      title: `Доска оголошень категорії ${categoryName} | Kando`,
      description: `Оголошення про ${categoryName} на дошці оголошеннь Kando`,
      images: [
        "https://kando.pp.ua/assets/og-category.webp"
      ]
    }
  };
}



export default async function ViewCategory({ params , searchParams }) {
  const { category } = await params;
  const p = await searchParams
  const page = p?.page || '1';
  
  let res;
  let data;


  try { 
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/items/${category}?page=${page}`, {
      next: { revalidate: 86400 }
    });
  } catch(err) {
    return notFound();
  }

  
  data = await res.json();
  
  const count = data?.data?.count || 0;
  const items = data?.data?.items || [];

  return (
    <ContainerLanguage>
        <CategorySchema
            count={count}
            category={getCategoryName(category)}
            list={items.slice(0,12)}
            path={{main: "/",category}}  
        />
        <Header />
        <MainContainer>
           <Search placeholder={"Введіть назву оголошення або послуги..."}></Search>
            <section className="flex flex-col justify-center" style={{
              width: "100%",
              background: "var(--background)",
              height: "fit-content",
              borderRadius: "1rem",
              padding: "1rem"
            }}>
              <h1>{`Список Оголошеннь: в категорії ${getCategoryName(category)}`}</h1>
    
              <BreadCrumbs baseUrl={`${category}`}></BreadCrumbs>
            </section>
          <GridProductsList
            filter={{
              course: "UAH"
            }}
            baseUrl={`${category}`}
            totalCount={count}
            list={items}
            currentPage={parseInt(page)}
          />
        </MainContainer>
      <Footer />
    </ContainerLanguage>
  );
}
