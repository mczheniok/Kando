const url = process.env.NEXT_PUBLIC_URL || "https://kando.pp.ua";


export function HomeSeoSchema() {
    
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Kando",
        "url": url,
        "logo": "https://kando.pp.ua/logos/kando.webp",
        "description": "Відкрийте для себе широкий вибір товарів на Kando — вашому надійному онлайн-маркетплейсі...",
        "founder": {
          "@type": "Person",
          "name": "Євгеній Шоробура"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "areaServed": "UA",
          "availableLanguage": ["Ukrainian","Russian"]
        }
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
        "image": `${image}`,
        "description": description,
        "sku": id,
        "offers": {
            "@type": "Offer",
            "url": `${url}/product/${id}`,
            "priceCurrency": "UAH",
            "price": 22000.00,
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