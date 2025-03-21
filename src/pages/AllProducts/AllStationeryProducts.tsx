"use client";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { useState } from "react";
import { TQueryParam } from "@/types/globalTypes";
import FiltersProducts from "./FiltersProducts";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Img } from "react-image";
import productNotFound from "../../assets/images/product-not-found.jpg";

const AllStationeryProducts = () => {
  const [filterQuery, setFilterQuery] = useState<TQueryParam[]>([]);

  const {
    data: productsData,
    isFetching,
    isLoading,
    error,
  } = useGetAllProductsQuery(filterQuery);
  const products = productsData?.data || [];

  return (
    <div className="container mx-auto p-4 overflow-hidden">
      {/* Filters Section */}
      <FiltersProducts setFilterQuery={setFilterQuery} />

      {/* Product Grid */}
      <div className="grid font-orbitron grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {isLoading || isFetching ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            Loading products...
          </p>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 col-span-6">
            <img
              src={productNotFound}
              alt="No Products available"
              className="w-[200px] mb-4"
            />
            <p className="text-black">
              Modify your filters or try searching for a different item
            </p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.2] rounded-xl p-4 shadow-md w-[18rem] md:w-[22rem] h-[480px]  my-3"
            >
              <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
                {product.name}
              </h3>
              <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
                {product.description}
              </p>
              <div className="w-full mt-4">
                <Img
                  src={product?.productImg as string}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl"
                  alt="thumbnail"
                />
              </div>
              <div className="flex justify-between items-center mt-10">
                <Link
                  to={`/product/${product?._id}`}
                  className="hover:cursor-pointer border border-neutral-300 lg:px-4 p-1 lg:py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-4"
                >
                  View Details <MdOutlineArrowOutward />
                </Link>
                <button className="outline outline-[1px] outline-gray-200 px-4 py-2 rounded-full">
                  Price: {product.price}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllStationeryProducts;
