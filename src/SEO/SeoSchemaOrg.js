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