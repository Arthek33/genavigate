import React, { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";

function VehicleList({ vehicles }) {
  // const [vehicles, setVehicles] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/v1/vehicles")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "success") {
  //         setVehicles(data.data.data); // Adjusted according to your data structure
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching vehicles:", error));
  // }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-8 gap-4">
        {vehicles.map((vehicle, idx) => (
          <div
            key={vehicle._id}
            className={`animate-fade-in-up animation-fill`}
            style={{ animationDelay: `${(idx + 1) * 200}ms` }}
          >
            <VehicleCard vehicle={vehicle} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
