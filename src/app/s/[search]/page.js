"use client"
import Header from "@/shared/blocks/Header"
import Search from "@/shared/blocks/search/Search";
import Footer from "@/shared/blocks/Footer";
import GridProductsList from "@/components/ProductsList/GridProductsList"
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import { useState , useEffect } from "react";
import { useParams , useSearchParams } from "next/navigation";
import { toServer } from "@/features/functions/functions";


export default function SearchPage() {
    const params = useParams();
    const [data,setData] = useState([]);
    const searchParams = useSearchParams();


    useEffect(() => {
      if(!params.search) return ;

      const query = searchParams.toString();
    
      toServer(`/items/page/${params.search}?${query}`)
      .then(res => {
          setData(res.data.items)
      });
    },[searchParams,params.search]);

    return (
      <ContainerLanguage>
        <Header></Header>
          <MainContainer>
            <Search set={setData} placeholder={"Шукати товар"}></Search>
              <GridProductsList currentPage={1} totalCount={data?.count} list={data}></GridProductsList>
          </MainContainer>
        <Footer></Footer>
      </ContainerLanguage>
    );
}   