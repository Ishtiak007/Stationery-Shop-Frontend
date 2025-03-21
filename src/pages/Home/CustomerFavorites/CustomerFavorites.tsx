"use strict";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { CustomerFavoritesCard } from "./CustomerFavoritesCard";

const CustomerFavorites = () => {
  const { data: productsData } = useGetAllProductsQuery(undefined);

  const isFeatured = productsData?.data?.filter(
    (itm) => itm.isFeatured === true
  );
  console.log(isFeatured, "featured");
  const featuredCards =
    isFeatured?.map((item) => ({
      title: item.name,
      src: item.productImg as string,
      id: item._id,
    })) || [];

  return (
    <div className="max-w-5xl mx-auto md:px-8 w-full mt-12 mb-8">
      <h2 className="flex text-center text-2xl font-semibold items-center justify-center mb-4">
        Customer Favorites
      </h2>
      <CustomerFavoritesCard cards={featuredCards} />
    </div>
  );
};

export default CustomerFavorites;
