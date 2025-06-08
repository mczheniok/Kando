"use client"
import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer"
import { ContainerLanguage, MainContainer } from "@/components/Containers/container"
import Search from "@/shared/blocks/search/Search"
import { toServer } from "@/features/functions/functions"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import GridProductsList from "@/components/ProductsList/GridProductsList"

export default function ViewCategory() {
    const params = useParams();
    const [items,setItems] = useState([]);
    const [paginationPage,setPaginationPage] = useState(1);
    const [pageCount,setCount] = useState(1);

    useEffect(() => {
        const a = async () => {
            const last = items[items.length - 1]?.created_at || new Date().toISOString()
            const data = await toServer(`/items/items/${params.category}?page=${paginationPage}&last=${last}`);
        
            setItems(data.data.items);
            console.log(data.data.items);
            setCount(data.count);
        }
        a()
        .catch(err => console.error(err));
    },[paginationPage]);

    return (
        <>      
            <ContainerLanguage>
                <Header />
                    <MainContainer>
                        <Search></Search>
                        <GridProductsList count={pageCount} set={setPaginationPage} items={items}></GridProductsList>
                    </MainContainer>
                <Footer />
            </ContainerLanguage>
        </>
    )
}