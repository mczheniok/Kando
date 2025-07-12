import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer"
import { ContainerLanguage, MainContainer } from "@/components/Containers/container"
import { Search } from "../../../shared/blocks/search/SearchWrapper";
import { GridProductsList } from "../../../components/ProductsList/GridListWrapper";
import { subCategoryUrl, subCategoryUrls } from "../../../config"
import { CategorySchema } from "../../../SEO/SeoSchemaOrg"
import { BreadCrumbs } from "@/shared/blocks/BreadCrumbs/BreadCrumbs";


export const revalidate = 43200; // обновление раз в сутки

export async function generateStaticParams() {
  const paths = [];
  
  Object.entries(subCategoryUrl)
  .map(([category,arr],_) => {
      arr.map((subcategory) => {
          paths.push({category,subcategory});
      })
  }) 

  return paths;
}

function getCategoryName(category) {
  return subCategoryUrls[category];
}


const textForSeo = (subcategory) =>  { 
  switch(subcategory) {
    case "Квартири": 
      
    return {
      title: `Оренда Квартир в Одесі — 30+ свіжих оголошень в категорії Посуточна Оренда Житла | Kando`,
      description: `Актуальні оголошення про оренду Квартир на Kando. ✅ Тисячі пропозицій з реальними фото, цінами та контактами власників. ➤ Заходьте та обирайте найкраще житло!`,
    }

    default: 
    return {
      title: `Kando`,
      description: `Актуальні оголошення про оренду Квартир на Kando. ✅ Тисячі пропозицій з реальними фото, цінами та контактами власників. ➤ Заходьте та обирайте найкраще житло!`,
    }
  }
}


export async function generateMetadata({ params }) {
  const { category , subcategory } = await params;


  const categoryName = getCategoryName(category);
  const subcategoryName = getCategoryName(subcategory);
  
  const result = textForSeo(subcategoryName);

  return {
    title: result.title,
    description: result.description,
    alternates: {
      canonical: `https://kando.pp.ua/${category}/${subcategory}`
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
      title: `${subcategoryName} - ${categoryName}`,
      description: `Оголошення про ${subcategoryName} на дошці оголошеннь Kando`,
      url: `https://kando.pp.ua/${category}/${subcategory}`,
      images: [
        {
          url: 'https://kando.pp.ua/assets/og-category.webp', // Сделайте общее или генерируйте динамически
          width: 1200,
          height: 630,
        },
      ],
      type: 'website'
    }
  };
}



export default async function ViewCategory({ params }) {
  const { category , subcategory } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_URL}/items/items/${category}?subcategory=${subcategory}&page=1`, {
    next: { revalidate: 43200 }
  });

  const data = await res.json();

  return (
    <ContainerLanguage>
      <CategorySchema 
        count={data.data.count}
        category={getCategoryName(category)}
        subcategory={getCategoryName(subcategory)}
        list={data.data.items.slice(0,12)}
        path={{main: "/",category,subcategory}}  
      />
      <Header />
        <MainContainer>
          <Search></Search>
            <section className="flex flex-col justify-center" style={{
              width: "100%",
              background: "var(--background)",
              height: "fit-content",
              borderRadius: "1rem",
              padding: "1rem"
            }}>
              <h1>Оголошення: {getCategoryName(subcategory)} у категорії {getCategoryName(category)}</h1>
              <BreadCrumbs baseUrl={`${category}/${subcategory}`}></BreadCrumbs>
            </section>
          <GridProductsList
            baseUrl={`${category}/${subcategory}`}
            count={data.data.count}
            list={data.data.items}
          />
        </MainContainer>
      <Footer />
    </ContainerLanguage>
  );
}
