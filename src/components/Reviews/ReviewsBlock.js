import { ButtonWithIcon, ButtonWithList } from "../../shared/Buttons/Buttons"
import styles from "./reviews.module.css"
import RowBlock from "../Row/RowBlock"
import ReviewsBlock from "../Products/Reviews"

export default function({Ratings}) {
    const stars = Array.from({length: 5},(_,ind) => ind+1)
    return (
        <section id="reviews" className="flex flex-col" style={{marginTop: '2rem'}}>
            <RowBlock className="justify-start">
                <ButtonWithList Icon={"star"} title={"Оцінки"}>
                    <ul className={styles.dropList}>
                        {stars.map((el,ind) => {
                            return <li key={`sort-by-stars-el-${ind}`}><h3>{el}</h3></li>
                        })}
                    </ul>
                </ButtonWithList>
                <ButtonWithIcon Icon={"picture"} title={"З Фото"}></ButtonWithIcon>
            </RowBlock>
            {Ratings.map((el,ind) => {
                return <ReviewsBlock src={"/assets/me.jpg"} obj={el} key={`reviews-el-${ind}`}></ReviewsBlock>
            })}
        </section>
    )
}

