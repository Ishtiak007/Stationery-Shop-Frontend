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
import { useDeleteOrderMutation } from "@/redux/features/admin/adminApi";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "sonner"; // Assuming you use toast for success/error messages
import { useState } from "react";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";

const ManageOrdersUser = () => {
  const [deleteOrder] = useDeleteOrderMutation(); // Hook for deleting orders
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null); // State to store the order to delete

  const {
    data: allOrders,
    isFetching,
    isLoading,
  } = useGetOrdersQuery(undefined);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap(); // Trigger delete order mutation
      toast.success("Order deleted successfully!");
      closeModal(); // Close the modal after successful deletion
    } catch (error) {
      toast.error("Failed to delete the order");
    }
  };

  const openModal = (orderId: string) => {
    setOrderToDelete(orderId);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setOrderToDelete(null); // Reset the orderToDelete
  };

  if (isLoading) {
    return <Loading />; // Show loading spinner while data is fetching
  }

  return (
    <>
      <div>
        <h2 className="text-2xl px-1 font-black text-center dark:text-white">
          Manage Orders
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
              <p className="text-sm text-green-600 text-center">
                Refreshing....
              </p>
            )}
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-400 text-center font-semibold text-base">
                  <TableHead>User</TableHead>
                  <TableHead>Order Id</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Cancel Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(allOrders?.data) &&
                  allOrders?.data.map((order: any) => (
                    <TableRow key={order._id} className="border-neutral-400">
                      <TableCell>{order.user}</TableCell>
                      <TableCell>{order?._id || "01223sz"}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>{order?.status || "paid"}</TableCell>
                      <TableCell>
                        {order?.transaction?.method || "shurjopay"}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => openModal(order._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <MdOutlineDelete size={20} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold">Confirm Deletion</h3>
            <p className="mt-4 text-sm text-gray-700">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteOrder(orderToDelete!)} // Ensure the orderId is passed
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

export default ManageOrdersUser;
