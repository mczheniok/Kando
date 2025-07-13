"use client";

import { useToServer } from "../../../shared/hooks/useToServer";
import { Column } from "../../../components/Columns/ColumnComponents";

export default function Archive() {
    const [load,data] = useToServer("/archive/all",{
        credentials: "include"
    },false);   

    return (
        <>
            <div>
                <section className="flex flex-row flex-wrap" style={{width: "100%"}}>

                </section>
            </div>

            <Column load={load} type={false} list={data}></Column>
        </>
    )

}
