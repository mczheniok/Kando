import styles from "./sectionsProducts.module.css"
import { StarsList } from "@/shared/list/list"
import { CardImage, CircleImage } from "../Image/Image"


function Review({obj,children}) {
  return (
    <article className={`${styles.Reviews} flex flex-col justify-around`}>
      <div>
        {children}
      </div>
      <ul className={styles.ReviewsList}>
        <li>
          <StarsList len={obj.stars}></StarsList>
        </li>
        <li>
          <h3>color: {obj.color}</h3>
        </li>
        <li >
          <p>{obj.text}</p>
        </li>
        <li>
          <h4>{obj.date}</h4>
        </li>
      </ul>
    </article>
  )
}

export default function ReviewsBlock({obj,src = null}) {
    return (
      <Review obj={obj}>
        {src && (
          <CircleImage width={60} height={60} src={src}></CircleImage>
        )}
      </Review>
    )
  } 


  export function ReviewRow({obj,src}) {
    return (
      <Review obj={obj}>
        {src && (
          <div className="flex flex-col align-center" style={{paddingTop: "1rem"}}>
              <CardImage width={80} height={80} src={src}></CardImage>
          </div>
        )}
      </Review>
    )
  }