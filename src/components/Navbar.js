import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function Navbar() {
  const [darkSide, setDarkSide] = useState(
    localStorage.theme === "light" ? false : true
  );
  const toggleTheme = () => {
    const currentTheme = localStorage.theme;
    setDarkSide(!darkSide);
    if (currentTheme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-500">VehiclesApp</h1>
        {/* <div>
          <button
            onClick={toggleTheme}
            className="mr-4 bg-gray-200 dark:bg-gray-600 py-2 px-4 rounded"
          >
            Toggle Theme
          </button>
          {/* ... other buttons ... 
        </div> */}
        <div className="space-x-4 flex flex-row">
          <div className="flex items-center">
            <DarkModeSwitch
              // style={{ marginBottom: "2rem" }}
              checked={darkSide}
              onChange={toggleTheme}
              size={30}
            />
          </div>
          <div>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Login
            </button>
          </div>
          <div>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
