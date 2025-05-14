"use strict";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { CustomerFavoritesCard } from "./CustomerFavoritesCard";
import { Link } from "react-router-dom";

const CustomerFavorites = () => {
  const { data: productsData } = useGetAllProductsQuery(undefined);

  const isFeatured = productsData?.data?.filter(
    (itm) => itm.isFeatured === true
  );
  const featuredCards =
    isFeatured
      ?.filter((item) => item._id) // skip items with missing _id
      .map((item) => ({
        title: item.name,
        src: item.productImg as string,
        id: item._id as string,
      })) || [];

  return (
    <div className="max-w-5xl mx-auto md:px-8 w-full mt-12 mb-8 my-10">
      <div className="text-center mb-12">
        <h5 className="text-lg font-semibold text-teal-800 uppercase">
          Customer Favorites
        </h5>
        <h2 className="text-3xl font-bold text-gray-800">
          Top Picks by Our Customers
        </h2>
      </div>
      <CustomerFavoritesCard cards={featuredCards} />
      <div className="flex justify-center items-center my-10">
        <Link to="/all-product">
          <button
            className="hover:cursor-pointer border border-neutral-300 px-4 py-2 flex gap-3 items-center justify-center font-medium rounded-full 
        transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white  my-4"
          >
            Show More Categories
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomerFavorites;
