"use client";

import { useToServer } from "../../../shared/hooks/useToServer";
import { Column } from "../../../components/Columns/ColumnComponents";

export default function Archive() {
    const [load,products] = useToServer("/account/products",{
        credentials: "include"
    },false);

    return (
        <>
            <div>
                <section className="flex flex-row flex-wrap" style={{width: "100%",padding: "1rem"}}>
                    {/* {Cardsarray.filter((_,ind) => ind !==2 ).map((el,ind) => {
                        return <CardBlock click={() => setActivePage(el.to)} key={`card-list-el-${ind}`} title={el.title} Icon={el.icon} notifications={"+3"} />
                    })} */}
                </section>
            </div>
            <Column load={load} type={true} list={products}></Column>
        </>
    )
}
