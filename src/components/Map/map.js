import { useRef, useEffect, memo , useMemo} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet';

import "leaflet/dist/leaflet.css";



const MapComponent = memo(({ title, height = "240px", position = []}) => {
  const mapRef = useRef();
  
  // Добавьте проверку валидности координат
  const isValidPosition = Array.isArray(position) && 
  position.length === 2 && 
  !isNaN(parseFloat(position[0])) && 
  !isNaN(parseFloat(position[1]));

  // Преобразуйте строки в числа если нужно
  const coordinates = isValidPosition ? 
    [parseFloat(position[0]), parseFloat(position[1])] : 
    [0, 0]; // fallback координаты

    const customIcon = useMemo(() => new Icon({
      iconUrl: "/icons/house.svg", 
      iconSize: [25, 25], 
      iconAnchor: [15, 15], 
      popupAnchor: [0, -15] 
    }), []);

  useEffect(() => {
    if (mapRef.current && isValidPosition) {
      mapRef.current.setView(coordinates);
    }
  }, [coordinates[0], coordinates[1]]); // используйте coordinates вместо position

  // Не рендерить карту если координаты невалидные
  if (!isValidPosition) {
    return <div style={{ height: height }}>Координаты не найдены</div>;
  }

  return (
    <div style={{ height: height, flexGrow: '1', zIndex: "100" }}>
      <MapContainer 
        center={coordinates} // используйте coordinates
        zoomControl={false}
        dragging={false}
        ref={mapRef}
        touchZoom={false}
        doubleClickZoom={false}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>
            {title}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
})

MapComponent.displayName = 'MapComponent';

export default MapComponent;