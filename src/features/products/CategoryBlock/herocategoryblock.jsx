import { LinkStyled } from "@/shared/link/link";
import { SubCategory , subCategoryUrl } from "@/config";


export const HeroCategory = () => {
    const ukraineText = Object.entries(SubCategory);

    return (
        <div className="flex flex-row flex-wrap" style={{width: "100%",minHeight: "300px",padding: "2rem 1rem",gap: "5rem"}}>
            {Object.entries(subCategoryUrl).map(([category,subcategories],categoryInd) => {        
                const UAtext = ukraineText[categoryInd];

                return (
                    <div className="flex flex-col align-start flex-grow" key={category}>
                        <h1 style={{marginBottom: "2rem",marginLeft: "1rem"}}>{UAtext[0]}</h1>

                        <ul style={{width: '100%'}}>
                            {subcategories.map((subcategory,subCategoryInd) => {
                                const text = UAtext[1][subCategoryInd];
                                return (
                                    <li key={subcategory} className="flex-grow">
                                        <LinkStyled url={`/${category}/${subcategory}`} el={text}></LinkStyled>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}