import React, { useState } from "react";
import LoaderClassic from "../assets/LoaderClassic";

function ButtonSubmit({ isLoading, children }) {
  return (
    // <button style={buttonStyle}>
    //   {children}
    // </button>

    <button
      type="submit"
      // className="w-full bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 dark:hover:bg-orange-700"
      className="w-full text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-red-800 font-medium rounded px-3 py-2 text-center"
    >
      {isLoading ? (
        <LoaderClassic
          color={"orange"}
          size={7}
          marginTop={0}
          disableStyleInjection={true}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default ButtonSubmit;
