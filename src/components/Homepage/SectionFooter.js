import React from "react";
import { LinkedinLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function SectionFooter() {
  return (
    <div className="w-full flex justify-center items-center p-16 bg-gray-50 dark:bg-gray-700">
      <div className="w-full max-w-screen-xl flex justify-between items-center">
        <div className="text-gray-500 font-medium">
          © 2023 Mathieu Schaeffer
        </div>
        <div className="text-gray-500 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          <Link
            to="https://www.linkedin.com/in/mathieu-schaeffer-836661121/"
            target="_blank"
          >
            <LinkedinLogo size={32} weight="fill" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SectionFooter;
