"use client"
import { Button } from "../Buttons/Buttons"
import { useSearchParams , useRouter } from "next/navigation"


export function Filters() {
    const searchParams = useSearchParams();
    const router = useRouter();


    const filtersPrice = [
        {
            label: "Сортувати в євро",
            type: "EUR",
            title: "€"
        },
        {
            title: "$",
            type: "DOL",
            label: "Сортувати в долларом"
        },
        {
            title: "₴",
            type: "UAH",
            label: "Сортувати за гривнею"
        }
    ]

    const handleClickButton = (e) => {
        const url = new URLSearchParams(searchParams);

        url.set("currency",e.target.course);
        router.push(`?${url.toString()}`);
    }


    return (
        <div className="flex flex-row align-center" style={{gap: ".5rem"}}>
            {filtersPrice.map((course) => {
                return (
                    <Button 
                        click={(e) => {
                            e.target.course = course.type;
                            handleClickButton(e);
                        }}
                        key={course.title}
                        title={course.title}
                        ariaLabel={course.label}
                    />
                )
            })}        
        </div>
    )
}