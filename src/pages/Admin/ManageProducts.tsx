/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "@/redux/features/products/productsApi";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner"; // Assuming you use toast for success/error messages
import { useState } from "react"; // Import useState to manage modal visibility
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const {
    data: allProducts,
    isFetching,
    isLoading,
  } = useGetAllProductsQuery(undefined);

  const [deleteProduct] = useDeleteProductMutation(); // Hook for deleting products

  // State to control modal visibility and store productId
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap(); // Call the delete mutation with the product ID
      toast.success("Product deleted successfully!"); // Show success message
      closeModal(); // Close the modal after successful deletion
    } catch (error) {
      toast.error("Error deleting product"); // Show error message
    }
  };

  const openModal = (productId: any) => {
    setProductToDelete(productId);
    setIsModalOpen(true); // Open the modal when delete is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal when cancel is clicked or after deletion
    setProductToDelete(null); // Reset the productId to null
  };

  if (isLoading) {
    return <Loading />; // Show loading spinner while data is fetching
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
                <TableRow className="border-neutral-400 text-primary-text font-semibold text-lg">
                  <TableHead>Product Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts?.data?.map((product) => (
                  <TableRow key={product._id} className="border-neutral-400">
                    <TableCell>
                      <img
                        src={product.productImg}
                        className="size-16 rounded-md"
                        alt="Product Image"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>{" "}
                    {/* Assuming stockQuantity is a field */}
                    <TableCell>
                      <div className="flex gap-5 items-center">
                        {/* Delete Button */}
                        <MdDelete
                          size={23}
                          className="cursor-pointer text-red-500"
                          onClick={() => openModal(product._id)} // Open modal with the productId
                        />
                        <Link to={`/product/update/${product._id}`}>
                          <FaEdit
                            size={23}
                            className="cursor-pointer text-green-500"
                          />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Normal Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold">Confirm Deletion</h3>
            <p className="mt-4 text-sm text-gray-700">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(productToDelete!)} // Ensure the productId is passed
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProducts;
