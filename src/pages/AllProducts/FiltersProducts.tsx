import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const FiltersProducts = ({ setFilterQuery }: any) => {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
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
    setFilterQuery([]);
  };

  return (
    <aside className="inset-0 top-24 w-full p-6">
      <div>
        <h2 className="text-2xl text-center my-14">Search Your Product</h2>
        <aside className="mt-6">
          <div className="lg:flex justify-around gap-12">
            <div className="flex-1 border p-8 rounded-md">
              <h3 className="mt-4 mb-1 font-medium text-center">
                Filter by Category
              </h3>
              <select
                className="w-full p-2 border-b border-neutral-300 focus:outline-none cursor-pointer"
                onChange={handleFilterChange}
                name="category"
              >
                <option value="">All</option>
                <option value="Pens">Pens</option>
                <option value="Pencils">Pencils</option>
                <option value="Erasers">Erasers</option>
                <option value="Notebooks">Notebooks</option>
                <option value="Calculators">Calculators</option>
                <option value="Paper">Paper</option>
                <option value="Markers">Markers</option>
                <option value="Tape">Tape</option>
                <option value="Books">Books</option>
                <option value="Staplers">Staplers</option>
                <option value="Folders">Folders</option>
                <option value="Scissors">Scissors</option>
                <option value="Glue">Glue</option>
                <option value="Highlighters">Highlighters</option>
                <option value="Rulers">Rulers</option>
                <option value="Sticky Notes">Sticky Notes</option>
                <option value="Paper Clips">Paper Clips</option>
                <option value="Index Cards">Index Cards</option>
                <option value="Whiteboard">Whiteboard</option>
                <option value="Sharpener">Sharpener</option>
                <option value="Binder Clips">Binder Clips</option>
                <option value="Thumbtacks">Thumbtacks</option>
              </select>
            </div>

            <div className="flex-1 border p-8 rounded-md">
              <h3 className="mt-4 mb-1 font-medium text-center">
                Filter by Availability
              </h3>
              <select
                className="w-full p-2 border-b border-neutral-300 focus:outline-none cursor-pointer"
                onChange={handleFilterChange}
                name="status"
              >
                <option value="">All</option>
                <option value="available">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-7 mx-auto"
          >
            Reset Filters
          </button>
        </aside>
      </div>
    </aside>
  );
};

export default FiltersProducts;
