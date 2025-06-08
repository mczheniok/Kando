export function None() {
    return (
        <div className="flex flex-row align-center justify-center" style={{padding: "2rem"}}>
            <div className="flex flex-col align-center">
                <div className="flex align-center justify-center" style={{background: "var(--border)",width: "150px",height:"150px",borderRadius: '50%',aspectRatio: '1'}}>
                    <img src="icons/not-happy.svg" height={100} width={100} alt="None Icon "></img>
                </div>
                <h1>Упс! Тут поки що порожньо</h1>
                <h3>Здається ви ще нічого не додали,або все вже архівовано</h3>
            </div>
        </div>
    )
} 