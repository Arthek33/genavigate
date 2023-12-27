import React, { useState, useEffect } from "react";
import VehicleList from "./VehicleList";
import { getAllVehicles } from "../../utils/api";
import LoaderClassic from "../../assets/LoaderClassic";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function VehicleCollection() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const vehicles = await getAllVehicles();
        setVehicles(vehicles.data.data.data);
        setVehicleList(vehicles.data.data.data);
        // setIsLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching vehicles:", err);
        // setIsLoading(false);
      }
      setIsLoading(false);
    };
    fetchVehicles();
  }, []);

  const handleSearchChange = (e) => {
    // setSearchTerm(e.target.value.toLowerCase());
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm)
      );
      setVehicleList(filteredVehicles);
    } else {
      setVehicleList(vehicles);
    }
  };

  if (isLoading) return <LoaderClassic color={"orange"} size={10} />;
  if (error)
    return <div className="w-full text-center mt-48">Error: {error}</div>;

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search vehicles"
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      /> */}
      <div class="container mx-auto mt-8  max-w-sm">
        {/* <label
          htmlFor="price"
          className="block  mx-4 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
        >
          Search
        </label> */}
        <div className="relative mt-2 rounded-md shadow-sm mx-4">
          <input
            type="text"
            name="price"
            id="price"
            // className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 sm:text-sm sm:leading-6 dark:bg-gray-700 text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500"
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 sm:text-sm sm:leading-6 bg-gray-100 border border-gray-500 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none border-b-2 border-transparent focus:border-b-orange-500"
            placeholder="Search vehicles"
            onChange={handleSearchChange}
          />
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"> */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 dark:text-gray-400">
            {/* <span className="text-gray-500 sm:text-sm">$</span> */}
            {/* <MagnifyingGlassIcon color="black" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <VehicleList vehicles={vehicleList} />
    </div>
  );
}

export default VehicleCollection;
