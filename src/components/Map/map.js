import { useRef, useEffect, memo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";

const MapComponent = memo(({ title, height = "240px", position = [] }) => {
  const mapRef = useRef();
  const customIcon = new Icon({
    iconUrl: "/icons/house.svg", 
    iconSize: [25, 25], 
    iconAnchor: [15, 15], 
    popupAnchor: [0, -15] 
  });

  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.setView(position);
    }
  }, [position[0], position[1]]);

  return (
    <div style={{ height: height, flexGrow: '1', zIndex: "100" }}>
      <MapContainer 
        center={position}
        zoomControl={false}
        dragging={false}
        ref={mapRef}
        touchZoom={false}
        doubleClickZoom={false}
        zoom={15}
        style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            {title}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;