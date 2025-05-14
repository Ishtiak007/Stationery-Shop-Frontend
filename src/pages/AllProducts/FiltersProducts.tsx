import React, { useState } from "react";
import { Input } from "@/components/ui/input";

/* eslint-disable @typescript-eslint/no-explicit-any */
const FiltersProducts = ({ setFilterQuery }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // To store the name search query
  const [priceRange, setPriceRange] = useState<string>(""); // To store the price range

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Update search query for product name
    if (name === "name") {
      setSearchQuery(value.toLowerCase()); // Convert input to lowercase
    }

    // Update price range
    if (name === "priceRange") {
      setPriceRange(value);
    }

    // Update filter query for price and name
    setFilterQuery((prevParams: any) => {
      let updatedQuery = prevParams ? [...prevParams] : [];

      updatedQuery = updatedQuery.filter((query) => query.name !== name);

      if (value) {
        updatedQuery.push({ name, value });
      }

      return updatedQuery;
    });
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery(""); // Clear the search query for product name
    setPriceRange(""); // Reset price range
    setFilterQuery([]); // Reset all filter queries
  };

  return (
    <aside className="inset-0 top-24 w-full p-4 sm:p-6">
      <div>
        <h2 className="text-2xl text-center my-10 sm:my-14">
          Search Your Product
        </h2>
        <aside className="mt-6 space-y-6">
          <div className="flex flex-col lg:flex-row justify-around gap-6 lg:gap-12">
            <div className="flex-1 border p-4 sm:p-6 lg:p-8 rounded-md">
              <h3 className="mt-4 mb-1 font-medium text-center">
                Filter by Category
              </h3>
              <select
                className="w-full p-2 border-b border-neutral-300 focus:outline-none cursor-pointer"
                onChange={handleFilterChange}
                name="category"
              >
                {/* ...options */}
              </select>
            </div>

            <div className="flex-1 border p-4 sm:p-6 lg:p-8 rounded-md">
              <h3 className="mt-4 mb-1 font-medium text-center">
                Filter by Availability
              </h3>
              <select
                className="w-full p-2 border-b border-neutral-300 focus:outline-none cursor-pointer"
                onChange={handleFilterChange}
                name="status"
              >
                {/* ...options */}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 lg:gap-12">
            {/* Filter by Product Name */}
            <div className="flex-1 border p-4 sm:p-6 lg:p-8 rounded-md">
              <h3 className="mt-4 mb-1 font-medium text-center">
                Filter by Full Name of Product
              </h3>
              <Input
                type="text"
                name="name"
                value={searchQuery}
                placeholder="Please enter the full name"
                onChange={handleFilterChange}
                className="w-full p-2 border-b border-neutral-300 focus:outline-none"
              />
            </div>

            {/* Filter by Price Range */}
            <div className="flex-1 border p-4 sm:p-6 lg:p-8 rounded-md">
              <h3 className="mt-4 mb-1 font-medium text-center">
                Filter by Price
              </h3>
              <select
                className="w-full p-2 border-b border-neutral-300 focus:outline-none cursor-pointer"
                onChange={handleFilterChange}
                name="priceRange"
                value={priceRange}
              >
                {/* ...options */}
              </select>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white mx-auto"
          >
            Reset Filters
          </button>
        </aside>
      </div>
    </aside>
  );
};

export default FiltersProducts;
