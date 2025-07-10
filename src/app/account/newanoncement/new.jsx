"use client";

import { LazyMap } from "@/components/lazy";
import { SectionContainer } from "../sections/section";
import { debounce } from "@/features/functions/functions";
import { useState , useCallback } from "react";
import { Input , InputArea } from "@/shared/input/input";


export function MapLayout ({locationRef}) {
    const [location,setLocation] = useState([44.4727805,44.4755123]);
    

    const debounceHandleInput = debounce((e) => {
        console.log("debounce");

        const regex = /@([^,]+),([^,]+),([^z]+)/;
        const matches = e.target.value.match(regex);

        if(matches) {
            const latitude = matches[1];  // Широта
            const longitude = matches[2]; // Долгота
            const zoom = matches[3];      // Зум

            setLocation(() => [latitude,longitude]);
            locationRef.location = [latitude,longitude];
        }
    },300)


    const handleInputLocation = (e) => {
        debounceHandleInput(e);
    }


    return (
        <SectionContainer headerText={"Місцезнаходження"}>
            <div className="flex flex-col" style={{maxWidth: "100%",borderRadius: "1rem"}}>
                <div style={{width: "100%"}}>
                    <LazyMap height="400px" title={"ваша квартира"} position={location}></LazyMap>
                </div>

                <Input 
                    placeholder="Введіть адресу або посилання на Google Maps" 
                    type="text"
                    name={"location"}
                    handler={handleInputLocation}
                ></Input>
            </div>
        </SectionContainer>
    )
} 


export function Description ({descriptionRef}) {
    const [length,setLength] = useState(3000);

    const handleInput = useCallback((e) => {
        const name = e.target.name;
        descriptionRef[name] = e.target.value;
        
        setLength(3000 - e.target.value.length);
    }, []);

    return(
        <>
            <div className="flex flex-row" style={{width: '100%'}}>
                <div className="flex flex-col align-start" style={{width: "100%"}}>
                    <div className="flex flex-row justify-between" style={{width: "100%"}}>
                        <h1>
                            Опис
                        </h1>
                        <h1>
                            залишилось символів: {length}
                        </h1>
                    </div>
                </div>
            </div>
            
            <InputArea name={"description"} placeholder={"Ввести опис оголошення"} handler={handleInput}></InputArea>
        </>
    )
}