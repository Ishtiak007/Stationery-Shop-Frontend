"use client";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import Loading from "@/components/ui/Loading";
import { Img } from "react-image";

const MegaMenu = () => {
  const {
    data: productsData,
    isLoading,
    isFetching,
    error,
  } = useGetAllProductsQuery([]);

  const products = productsData?.data || [];

  const featuredProducts = products
    .filter((product) => product.isFeatured === true)
    .slice(0, 3);

  return (
    <div className="relative z-[1000000] w-full bg-white shadow-xl rounded-xl p-4 lg:p-6 max-w-screen-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Recently Added
      </h3>

      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">Failed to load featured products.</p>
      ) : featuredProducts.length === 0 ? (
        <p className="text-gray-500">No featured products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
            >
              <Img
                height="1000"
                width="1000"
                src={product?.productImg as string}
                className="h-60 w-full object-cover rounded-xl"
                alt="thumbnail"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description || "No description available."}
              </p>
              <div className="mt-auto text-sm text-gray-400">
                Added on: {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <Link
                to={`/product/${product._id}`}
                className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
          <Link
            to={`/all-product`}
            className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
          >
            All products →
          </Link>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
