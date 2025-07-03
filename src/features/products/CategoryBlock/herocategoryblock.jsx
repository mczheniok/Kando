import { LinkStyled } from "@/shared/link/link";
import { SubCategory , subCategoryUrl } from "@/config";


export const HeroCategory = () => {
    const categoryName = Object.keys(SubCategory);

    return (
        <div className="flex flex-row flex-wrap" style={{width: "100%",minHeight: "300px",padding: "2rem 1rem",gap: "5rem"}}>
            {Object.entries(SubCategory).map(([objectKey,ObjectValue],key) => {
                return <div className="flex flex-col align-start" key={`category-column-el-${key}`} style={{flexGrow: "1"}}>
                    <h1 style={{marginBottom: "2rem"}}>{categoryName[key]}</h1>
                    {ObjectValue.map((el,ind) => {
                        const url = subCategoryUrl[objectKey][ind];

                        return (
                            <LinkStyled el={el} url={url} key={`link-style-el-${ind}`}></LinkStyled>
                        )
                    })}  
                </div>
            })}
        </div>
    )
}