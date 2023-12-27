import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function DayNightSwitch() {
  const [darkSide, setDarkSide] = useState(
    localStorage.theme === "light" ? false : true
  );
  const toggleTheme = () => {
    const currentTheme = localStorage.theme;
    if (currentTheme === "dark") {
      setDarkSide(false);
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      window.dispatchEvent(new Event("storage"));
    } else {
      setDarkSide(true);
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="flex items-center">
      <DarkModeSwitch
        // style={{ marginBottom: "2rem" }}
        checked={darkSide}
        onChange={toggleTheme}
        size={30}
      />
    </div>
  );
}

export default DayNightSwitch;
