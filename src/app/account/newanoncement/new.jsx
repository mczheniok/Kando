export const MapLayout = ({setLocation}) => {
    return <SectionContainer headerText={"Місцезнаходження"}>
    <div className="flex flex-col" style={{maxWidth: "100%",borderRadius: "1rem"}}>
            <div style={{width: "100%"}}>
                <LazyMap height="400px" title={"ваша квартира"} position={location}></LazyMap>
            </div>
            
            <input placeholder="Введіть адресу або посилання на Google Maps" type="text" name="location" onChange={e => {
                setTimeout(() => {
                    const regex = /@([^,]+),([^,]+),([^z]+)/;
                    const matches = e.target.value.match(regex);
                
                    if(matches) {
                        const latitude = matches[1];  // Широта
                        const longitude = matches[2]; // Долгота
                        const zoom = matches[3];      // Зум
                        setLocation(prev => [latitude,longitude]);
                    }
                },100)
            }} className={styles.AccountInput}></input>
    </div>
    </SectionContainer>
} 