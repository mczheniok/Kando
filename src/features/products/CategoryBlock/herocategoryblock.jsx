import { LinkStyled } from "@/shared/link/link";
import { SubCategory } from "@/config";


export const HeroCategory = () => {
    const categoryName = Object.keys(SubCategory);

    return (
        <div className="flex flex-row flex-wrap" style={{width: "100%",minHeight: "300px",padding: "2rem 1rem",gap: "5rem"}}>
            {Object.values(SubCategory).map((el,ind) => {
                return <div className="flex flex-col align-start" key={`category-column-el-${ind}`} style={{flexGrow: "1"}}>
                    <h1 style={{marginBottom: "2rem",color: "var(--)"}} >{categoryName[ind]}</h1>
                    {el.map((el,ind) => {
                        return (
                            <LinkStyled el={el} key={`link-style-el-${ind}`}></LinkStyled>
                        )
                    })}  
                </div>
            })}
        </div>
    )
}