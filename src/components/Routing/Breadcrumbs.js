import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-300 text-sm font-medium">
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                // className="w-5 h-5"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            <li
              className={
                index === items.length - 1
                  ? ""
                  : "dark:hover:text-gray-200 hover:text-gray-700"
              }
            >
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
