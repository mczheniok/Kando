import { ProductDescription } from "./descirptionSection"
import { ImageSection } from "./imageSection"
import styles from "./product.module.css"




export function ServerInfo({images,data,category}) {
    return (
        <section
            className={styles.ProductLayout}
            style={{background: "var(--bg-card)"}}
        >
            <ImageSection images={images} id={data.id}></ImageSection>
            <ProductDescription data={data}></ProductDescription>
        </section>    
    )    
}