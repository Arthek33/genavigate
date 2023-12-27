import React from "react";
import VehicleCard from "./VehicleCard";

function VehicleList({ vehicles }) {
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
