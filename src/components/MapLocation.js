import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const myIcon = L.divIcon({
  className: "pin",
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute bottom-0 -left-5 w-10 h-10 text-orange-500 drop-shadow-md hover:h-12 hover:w-12 hover:-left-6 transition-all">
  <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
</svg>
`,

  popupAnchor: [-7, -32],
  // iconAnchor: [0, 0],
});

function MapLocation({ vehicles }) {
  const [darkMap, setDarkMap] = useState(
    localStorage.getItem("theme") === "light"
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    // : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
  );
  const mapRef2 = useRef(null);

  function checkTheme() {
    const mapStyle =
      localStorage.getItem("theme") === "light"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        : "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
    // : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    setDarkMap(mapStyle);
  }
  useEffect(() => {
    checkTheme();
    window.addEventListener("storage", checkTheme);
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", checkTheme);
    };
  }, [vehicles]);

  return vehicles && vehicles.length ? (
    <div className="rounded overflow-auto">
      <MapContainer
        center={[46.21208, 6.152915]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "auto", height: "500px" }}
        ref={mapRef2}
      >
        <TileLayer attribution="" url={darkMap} />
        {vehicles.map((vehicle, idx) => {
          return (
            <Marker
              position={[...vehicle.location.coordinates].reverse()}
              icon={myIcon}
              key={`marker-${idx}`}
            >
              <Popup key={`popup-${idx}`}>
                <strong>{vehicle.location.description}</strong> <br />{" "}
                {vehicle.location.address}
                <Link to={`/vehicle/${vehicle.id}`}> See details </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  ) : (
    <div className="text-center py-8">Loading...</div>
  );
}

export default MapLocation;
