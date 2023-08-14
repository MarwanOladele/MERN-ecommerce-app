import React from "react";

const Filters = ({ showFilters, setShowFilters, filters, setFilters }) => {
  return (
    <div className="w-72">
      <div className="flex justify-between items-center">
        <h1 className="text-orange-900 text-xl">Filters</h1>
        <i
          className="ri-close-line cursor-pointer text-5xl"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
    </div>
  );
};

export default Filters;
