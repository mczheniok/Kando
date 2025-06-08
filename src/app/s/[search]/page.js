"use client"
import Header from "@/shared/blocks/Header"
import Search from "@/shared/blocks/search/Search";
import Footer from "@/shared/blocks/Footer";
import GridProductsList from "@/components/ProductsList/GridProductsList"
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import { useState , useEffect } from "react";
import { useParams } from "next/navigation";
import { toServer } from "@/features/functions/functions";


export default function Home() {
    const params = useParams();
    const [data,setData] = useState([]);

    useEffect(() => {
        toServer(`/items/page/${params.search}`)
        .then(res => {
            setData(res.data.items)
        });
    },[])

    return (
      <ContainerLanguage>
        <Header></Header>
          <MainContainer>
            <div className="flex flex-col" style={{ backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundColor:"var(--orange)",backgroundPosition: "center",borderRadius: "1rem",backgroundImage: "url('assets/background.webp')",gap:"1rem"}}>
                <Search set={setData} placeholder={"Шукати товар"}></Search>
            </div>
            <GridProductsList items={data}></GridProductsList>
          </MainContainer>
        <Footer></Footer>
      </ContainerLanguage>
    );
}   
