import { subCategoryUrls } from "../config"
const url = process.env.NEXT_PUBLIC_URL || "https://kando.pp.ua";


export function HomeSeoSchema() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Kando",
        "alternateName": "Кандо",
        "url": url,
        "logo": "https://kando.pp.ua/logos/kando.webp",
        "description": "Kando — це онлайн-маркетплейс оголошень, що дозволяє легко розміщувати, знаходити та переглядати пропозиції з оренди нерухомості, одягу, взуття та інших категорій. Платформа створена для зручної взаємодії між користувачами з України.",
        "founder": {
          "@type": "Person",
          "name": "Євгеній Шоробура"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "areaServed": "UA",
          "availableLanguage": ["Ukrainian","Russian"]
        },
        "foundingDate": "2025-05-08"
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData).replace(/</g, '\\u003c'),
                }}
            />
        </section>
    )
}



export function ProductSeoSchema({product}) {
    const {
        id,
        name,
        image,
        price,
        created_at,
        description,
    } = product;


    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "image": {
            "@type": "ImageObject",
            "url": `${image}`,
            "width": 1200,
            "height": 800
        },
        "description": description,
        "sku": id,
        "offers": {
            "@type": "Offer",
            "url": `${url}/product/${id}`,
            "priceCurrency": "UAH",
            "price": price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/UsedCondition"
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData).replace(/</g, '\\u003c'),
                }}
            />
        </>
    )
}



export function FooterSeoSchema() {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kando",
      "url": "https://kando.pp.ua",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kando.pp.ua/s/{search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "hasPart": {
        "@type": "SiteNavigationElement",
        "name": "Основні посилання",
        "url": "https://kando.pp.ua/",
        "about": [
          { "@type": "WebPage", "name": "Головна", "url": "https://kando.pp.ua/" },
          { "@type": "WebPage", "name": "Про нас", "url": "https://kando.pp.ua/about" },
          { "@type": "WebPage", "name": "Акаунт", "url": "https://kando.pp.ua/account" },
          { "@type": "WebPage", "name": "Політика Користування", "url": "https://kando.pp.ua/termofuse" }
        ]
      }
    }


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData).replace(/</g, '\\u003c'),
                }}
            />
        </>
    )
}



export function CategorySchema({count,category,subcategory = "",path,list=[]}) {
    const ItemsList = Object.values(path);

    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "name": `${category} ${subcategory} — 1250+ свіжих оголошень | Kando`,
            "description": `Актуальні оголошення про ${subcategory}. Тисячі оголошень з реальними фото, цінами та контактами.`,
            "url": "https://kando.pp.ua/neruhomist/kvartyry",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": count, // Динамически подставляйте реальное количество
              "itemListElement": 
                list.map((product,ind) => ({
                    "@type": "ListItem",
                    "position": ind,
                    "item": {
                      "@type": "Product",
                      "name": `${product.name.length > 60 ? product.name.slice(0,60) : product.name}`, // Название объявления
                      "url": `https://kando.pp.ua/product/${product.id}`, // URL объявления
                      "image": `https://kando.pp.ua/images${product.previewimage}`, // Главное фото
                      "description": `${product.seodescription || `Оголошення в категорії ${category} ${subcategory?"в підкатегорії":""} ${subcategory}`}`, // Краткое описание
                      "offers": {
                        "@type": "Offer",
                        "price": product.price,
                        "priceCurrency": "UAH", // или UAH
                        "availability": "https://schema.org/InStock" // InStock = актуально
                      },
                      "sku": product.id // Уникальный ID объявления
                    }
                }))
            }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": ItemsList.map((value, ind) => {
              const fullPath = ItemsList.slice(0, ind + 1).join("/");
          
              return {
                "@type": "ListItem",
                "position": ind + 1,
                "name": ind === 0 ? "Головна" : subCategoryUrls[value] || value,
                "item": `https://kando.pp.ua/${fullPath}`.replace(/([^:]\/)\/+/g, "$1") 
              };
            })
          }
        ]
      };
  
      return (
          <>
              <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                      __html: JSON.stringify(schemaData).replace(/</g, '\\u003c'),
                  }}
              />
          </>
      ) 
}



export function BreadCrumbList ({count,category,subcategory,path}) {
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Головна",
              "item": "https://kando.pp.ua/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": category, // Название категории
              "item": `https://kando.pp.ua/${path.category}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": subcategory, // Название категории
              "item": `https://kando.pp.ua/${path.category}/${path.subcategory}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": {subcategory} // Название подкатегории
            }
          ]
        }
      ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaData).replace(/</g, '\\u003c'),
                }}
            />
        </>
    )
}