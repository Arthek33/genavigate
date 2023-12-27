import React from "react";
import { Link } from "react-router-dom";
import { numberWithSpaces } from "../../utils/utils";
import FavoriteIcon from "../Tools/FavoriteIcon";

function VehicleCard({ vehicle }) {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  // const API_BASE_URL ="http://localhost:3000/";
  const imageURL = `${API_BASE_URL}/img/vehicles/${vehicle.imageCover}`;

  return (
    <div className="border dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-700">
      <FavoriteIcon
        vehicle={vehicle}
        className="absolute top-6 right-7"
        clickable={false}
      />
      <img
        src={imageURL}
        alt={vehicle.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 text-sm">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {vehicle.name}
          <span className="mx-2 px-3 py-0.5 bg-gray-100 dark:bg-gray-600 rounded text-xs font-normal text-gray-400 dark:text-gray-400">
            {vehicle.vehicleType}
          </span>
        </h3>
        <div className="grid grid-cols-2">
          <div>
            <p className="text-gray-500 dark:text-gray-400 mb-3">
              Price :{" "}
              <span className="text-gray-900 dark:text-gray-200 font-medium">
                ${numberWithSpaces(vehicle.price)}
              </span>
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Speed :{" "}
              <span className="text-gray-900 dark:text-gray-200 font-medium">
                {vehicle.speed} km/h
              </span>
            </p>
          </div>
          <div className="flex justify-end items-end">
            <Link
              to={`/vehicle/${vehicle.slug}`}
              // className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 md:px-5 px-3 rounded transition duration-300 whitespace-nowrap"
              className="flex items-center card-button group border border-orange-600 hover:border-orange-500 hover:shadow-md hover:text-orange-600 dark:hover:text-orange-600 bg-transparent text-gray-800 dark:text-gray-200 text-sm font-medium py-2 md:px-3 px-2 rounded transition duration-300 whitespace-nowrap"
            >
              View Details
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-1 inline-block h-4 overflow-visible align-middle box-border stroke-orange-600"
              >
                <path
                  class=" -translate-x-1 transition-transform group-hover:translate-x-0"
                  d="M8 13L13 8L8 3"
                  stroke-width="1.5"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                ></path>
                <path
                  class="custom-arr-path"
                  d="M12 8L2 8"
                  stroke-width="1.5"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
