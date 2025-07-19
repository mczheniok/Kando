import Footer from "@/shared/blocks/Footer"
import Header from "@/shared/blocks/Header"
import { ServerLoader } from "@/shared/blocks/serverLoader"
import { Suspense } from "react"
import { 
    SubCategory,
    subCategoryUrl
} from "@/config";
import Link from "next/link";
import { BreadCrumbs } from "@/shared/blocks/BreadCrumbs/BreadCrumbs";
import { LinkStyled } from "@/shared/link/link";


export const dynamic = "force-static";


export const metadata = {
    title: "Карта сайту | Kando",
    description: "Карта сайту з усіма категоріями та сторінками на kando.pp.ua",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://kando.pp.ua/sitemap",
    },
    openGraph: {
      title: "Карта сайту",
      description: "Перегляньте всі категорії, підкатегорії та сторінки на сайті",
      url: "https://kando.pp.ua/sitemap",
      siteName: "Kando",
      locale: "uk_UA",
      type: "website",
      images: [
        {
          url: "https://kando.pp.ua/assets/background.webp",
          width: 800,
          height: 600,
          alt: `Карта сайту`
        }
      ],
    },
    twitter: {
        card: "summary_large_image",
        title: `Карта сайту | Kando`,
        description: "Карта сайту з усіма категоріями та сторінками на kando.pp.ua",
        images: [
            "https://kando.pp.ua/assets/background.webp"
        ]
    }
  }


export default function SiteMapPage() {
    const uaCategory = Object.entries(SubCategory)
    const srcCategory = Object.entries(subCategoryUrl);

    const styles = {
        ulStyle: {
            padding: '2rem',width: "100%",background: "var(--background)",borderRadius: "1rem"
        },
    }

    const Links = [
        {url: "/",title: "Головна"},
        {url: "/account",title: "Акаунт"},
        {url: "/termofuse",title: "Політика Користування"},
    ]

    return (
        <div>
            <Suspense fallback={<ServerLoader />}>
                <Header />
            </Suspense>
            
            <section className="container flex flex-col" style={{padding: "1rem"}}>
                <div className="flex flex-row align-center">
                    <BreadCrumbs baseUrl={`/sitemap`}></BreadCrumbs>
                </div>

                <div className="flex flex-col" style={styles.ulStyle}>
                    <h1 className="h1-text" >
                        Основні посилання
                    </h1>
                    <ul className="flex flex-col" >

                        {Links.map((el,ind) => {
                            return (
                                <li key={`basic-links-${ind}`}>
                                    <LinkStyled el={el.title} url={el.url} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                

                <div className="flex flex-col " style={styles.ulStyle}>
                    <p className="h1-text">Категорії</p>
                    {uaCategory.map(([key,arr],keyInd) => {
                        return (
                            <ul key={`category-list-${key}`} className="flex flex-col" style={styles.ulStyle}>
                                <li>
                                    <Link href={`/${srcCategory[keyInd][0]}`}>
                                        <p className="h3-text">{key}</p>
                                    </Link>
                                </li>

                                <ul className="flex flex-col align-start fle-grow" style={{
                                    marginLeft: "1rem",width: "100%"
                                }}> 
                                    {arr.map((text,textInd) => {
                                        return (
                                            <li key={`link-${text}`} style={{width: "100%"}}>
                                                <LinkStyled el={text} url={`/${srcCategory[keyInd][0]}/${srcCategory[keyInd][1][textInd]}`} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </ul>
                        )
                    })}
                </div>
            </section>
            
            <Footer />
        </div>
    )
}