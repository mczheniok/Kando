import Image from "next/image"

export function None() {
    return (
        <div className="flex flex-row align-center justify-center" style={{padding: "2rem"}}>
            <div className="flex flex-col align-center">
                <div className="flex align-center justify-center" style={{width: "150px",height:"150px",borderRadius: '50%',aspectRatio: '1'}}>
                    <Image src="/assets/who.png" height={250} width={250} alt="Значок Зовсім нічого немає"></Image>
                </div>
                <h1>Упс! Тут поки що порожньо</h1>
                <h3>Здається ви ще нічого не додали,або все вже архівовано</h3>
            </div>
        </div>
    )
} 