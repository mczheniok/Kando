import styles from "./description.module.css";
import { parsePrice } from "@/features/functions/functions";
import { Desciption, Specifications } from "./client/desciption";



export function ProductDescription({data}) {
    const {
        type,
        name,
        price,
        category,
        description,
    } = data

    return (
        <section className={`${styles.ProductDescription} flex flex-col`}>
            <div style={{width: '100%'}}>
                <h1>{name}</h1>
            </div>
            <div className={`${styles.ProductPrice} flex flex-row align-center`}>
                <h2>{parsePrice(price)}</h2>
            </div>
            <div className={`${styles.ProductGrade} flex flex-row align-center`}>
                <span className="tw-secondary-text">Оцінка користувачів 3.2 (3 Відгуки)</span>
            </div>
            <Specifications category={type} array={category}/>
            <Desciption description={description} />
        </section>
    )
}