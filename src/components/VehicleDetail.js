import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import GLTFViewer from "./GLTFViewer";
import MapLocation from "./MapLocation";
import { Leva } from "leva";
import FavoriteIcon from "./FavoriteIcon";
import { getVehicleBySlug } from "../utils/api";
import LoaderClassic from "../assets/LoaderClassic";
import Breadcrumbs from "./Breadcrumbs";

import {
  TagIcon,
  CurrencyDollarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const lightTheme = {
  colors: {
    elevation1: "transparent",
    elevation2: "transparent",
    elevation3: "#eee",
    accent1: "orange",
    accent2: "orangered",
    accent3: "yellow",
    highlight1: "blue",
    highlight2: "darkslategrey",
    highlight3: "black",
    vivid1: "green",
  },
  shadows: {
    level1: "0",
    level2: "0",
  },
  fonts: {
    mono: `'Inter var',ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
    sans: `system-ui, sans-serif`,
  },
  fontWeights: {
    label: "normal",
    folder: "600",
    button: "normal",
  },
  fontSizes: {
    root: "12px",
  },
};
const darkTheme = {
  colors: {
    elevation1: "transparent",
    elevation2: "transparent",
    elevation3: "#373C4B",
    accent1: "orange",
    accent2: "orangered",
    accent3: "#3C93FF",
    highlight1: "#535760",
    highlight2: "#8C92A4",
    highlight3: "#eee",
    vivid1: "#ffcc00",
  },
  shadows: {
    level1: "0",
    level2: "0",
  },
  fonts: {
    mono: `'Inter var',ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
    sans: `system-ui, sans-serif`,
  },
  fontWeights: {
    label: "normal",
    folder: "600",
    button: "normal",
  },
  fontSizes: {
    root: "12px",
  },
};
function VehicleDetail() {
  const [vehicle, setVehicle] = useState(null);
  const { slug } = useParams();
  const [levaTheme, setLevaTheme] = useState(
    localStorage.getItem("theme") === "light" ? lightTheme : darkTheme
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function checkTheme(event) {
    const theme =
      localStorage.getItem("theme") === "light" ? lightTheme : darkTheme;
    setLevaTheme(theme);
  }

  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/v1/vehicles/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "success") {
  //         setVehicle(data.data.data);
  //       }
  //     })
  //     .catch((error) =>
  //       console.error("Error fetching vehicle details:", error)
  //     );
  //   window.addEventListener("storage", checkTheme);
  //   return () => {
  //     // Remove the handler when the component unmounts
  //     window.removeEventListener("storage", checkTheme);
  //   };
  // }, [id]);

  useEffect(() => {
    const fetchVehicle = async () => {
      setIsLoading(true);
      try {
        const response = await getVehicleBySlug(slug);
        setVehicle(response.data.vehicle);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching vehicle:", err);
      }
      setIsLoading(false);
    };
    fetchVehicle();
    checkTheme();
    window.addEventListener("storage", checkTheme);
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", checkTheme);
    };
  }, [slug]);

  if (isLoading) return <LoaderClassic color={"orange"} size={10} />;
  if (error)
    return (
      <div className="w-full text-center mt-48 text-gray-900 dark:text-gray-100">
        Error: {error}
      </div>
    );

  return vehicle ? (
    <div className="container mx-auto max-w-7xl px-4 mb-8">
      <div className="py-5">
        <Breadcrumbs
          items={[
            { label: "All Vehicles", path: "/" },
            // { label: "Library", path: "/library" },
            { label: vehicle.name, path: "" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 relative">
          <FavoriteIcon
            vehicle={vehicle}
            className="absolute top-5 right-20"
            size={3}
          />
          <h2 className="text-3xl font-semibold mb-4 dark:text-gray-100">
            {vehicle.name}
          </h2>
          <div className="rounded-lg overflow-hidden h-136 flex items-center justify-center px-5">
            <GLTFViewer gltf={vehicle.gltf} />
          </div>
        </div>
        <div>
          <div className="px-5 pb-2 text-sm mt-4">
            <h3 className="font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Vehicule summary
            </h3>

            <div className="flex justify-between  mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <TagIcon className="h-5 w-6 mr-2 text-orange-600" />
                <span>Type</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {vehicle.vehicleType}
              </span>
            </div>
            <div className="flex justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <CurrencyDollarIcon className="h-5 w-6 mr-2 text-orange-600" />
                <span>Price</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                ${vehicle.price}
              </span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <BoltIcon className="h-5 w-6 mr-2 text-orange-600" />
                <span>Speed</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {vehicle.speed}
              </span>
            </div>
          </div>
          <div className="leva-container">
            <Leva
              theme={levaTheme}
              fill
              hideTitleBar // default = false, hides the GUI header
              titleBar={false}
              drag={false}
              update
            />
          </div>
        </div>
      </div>
      <div>
        <MapLocation vehicles={[vehicle]} />
      </div>
    </div>
  ) : (
    <div className="text-center py-8">Loading...</div>
  );
}

export default VehicleDetail;
