"use client"
import Header from "@/shared/blocks/Header";
import Footer from "@/shared/blocks/Footer";
import Search from "@/shared/blocks/search/Search";
import { Column } from "@/components/Columns/ColumnComponents";
import { ButtonWithIcon } from "@/shared/Buttons/Buttons";
import RowBlock from "@/components/Row/RowForm";

export default function Bucket() {
    const serverDataList = [
        {img: "/assets/nubia0.jpg",title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00",Sells: "22.000",id: 0},
        {img: "/assets/nubia0.jpg",title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00",Sells: "22.000",id: 1},
        {img: "/assets/nubia1.jpg",title: "Red Magic 6R",price: "14.000,50",LastPrice: "22.000,00",Sells: "22.000",id: 5},
        {img: "/assets/nubia1.jpg",title: "Red Magic 6R",price: "14.000,00",LastPrice: "22.000,00",Sells: "22.000",id: 6}
    ]

    function handleBuy(e) {
      console.log(e)
    }

    const parseUAPrice = (priceStr) => {
      
      const cleanStr = priceStr.replace(/\s/g, '');
      
      const parts = cleanStr.split(',');

      const integerPart = parts[0].replace(/\./g, '');
      
      const decimalPart = parts[1] || '00';
      
      return parseFloat(`${integerPart}.${decimalPart}`);
    };
    
    const calculateTotalPrice = (serverDataList) => {
      const total = serverDataList.reduce((sum, el) => {
        return sum + parseUAPrice(el.price);
      }, 0);
    
      return total.toLocaleString("uk-UA", {
        style: "currency",
        currency: "UAH",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };
    
    return (
        <div>
        <Header></Header>
          <main style={{background: "var(--background)"}} className={"container flex flex-col"}>
              <Search></Search>
              <Column list={serverDataList}></Column>
              <RowBlock className="justify-between">
                <h2>Сумма Обранних товарів: {calculateTotalPrice(serverDataList)}</h2>
                <ButtonWithIcon title={"Купити"} Icon={"buy"} click={handleBuy}></ButtonWithIcon>
              </RowBlock>
          </main>
        <Footer></Footer>
      </div>
    )
}