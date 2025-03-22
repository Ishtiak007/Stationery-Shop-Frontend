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
    isFeatured?.map((item) => ({
      title: item.name,
      src: item.productImg as string,
      id: item._id,
    })) || [];

  return (
    <div className="max-w-5xl mx-auto md:px-8 w-full mt-12 mb-8 my-10">
      <h2 className="flex text-center text-2xl font-semibold items-center justify-center mb-4">
        Customer Favorites
      </h2>
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
