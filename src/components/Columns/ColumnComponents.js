import { None } from "@/shared/information/none"
import { CardRow, Message } from "../Cards/Card"
import { ReviewRow} from "../Products/Reviews"
import Loading from "../loader"

export function Column({load,list,type=false}) {
    return (
        <section className="flex flex-col" style={{width: "100%",padding: "0rem  2rem 0rem 0rem",margin: "1rem",height: "fit-content",marginBottom: "5rem"}}>
            {load?<Loading time={200}/>:list?.length === 0 && !load?<None />:list?.map((el,ind) => {
                return (
                    <CardRow t={type} key={`column-el-ind-${ind}`} obj={el}></CardRow>
                )
            })}
        </section>
    )
}

export function ColumnReviews({list,img = null}) {
    return (
        <section className="flex flex-col" style={{width: "100%",overflowY: "auto"}}>
            {list.map((el,ind) => {
                return (
                    <ReviewRow key={`reviews-list-el-${ind}`} obj={el} src={el.src}></ReviewRow>
                )
            })}
        </section>
    )
}


export function ColumnMessages({load,list,set=() => {}}) {
    return (
        <section className="flex flex-col" style={{width: "100%",padding: "1rem",height: "fit-content",background: "var(--background)",gap: "0rem",marginBottom: "5rem"}}>
            {load?<Loading time={200}/>:list?.length === 0 && !load?<None />:list?.map((el,ind) => {
                return (
                    <Message set={set} obj={el} key={`message-el-${ind}`}></Message>
                )
            })}
        </section>
    )
}

