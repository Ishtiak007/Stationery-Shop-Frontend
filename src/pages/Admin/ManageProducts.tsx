// eslint-disable @typescript-eslint/no-explicit-any

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/ui/Loading";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";

const ManageProducts = () => {
  const {
    data: allProducts,
    isFetching,
    isLoading,
  } = useGetAllProductsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h2 className="text-2xl px-1 font-black text-primary-text dark:text-white">
          Manage Products
        </h2>
        {isLoading ? (
          <div className="mt-10 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            {isFetching && (
              <p className="text-sm text-red-800">Refreshing...</p>
            )}
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-400 text-primary-text font-semibold text-xl">
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts?.data?.map((product) => (
                  <TableRow
                    key={product._id}
                    className="border-neutral-400 text-primary-text"
                  >
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageProducts;
