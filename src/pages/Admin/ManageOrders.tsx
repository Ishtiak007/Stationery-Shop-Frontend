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
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/features/admin/adminApi";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "sonner"; // Assuming you use toast for success/error messages
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";

const ManageOrders = () => {
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [deleteOrder] = useDeleteOrderMutation(); // Hook for deleting orders
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null); // State to store the order to delete

  const {
    data: allOrders,
    isFetching,
    isLoading,
  } = useGetOrdersQuery(undefined);

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (
    orderId: string,
    currentStatus: string,
    newStatus: string
  ) => {
    if (currentStatus === newStatus) return;

    setLoadingOrderId(orderId);
    try {
      const res = await updateOrderStatus({
        orderId,
        status: newStatus,
      }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setLoadingOrderId(null);
    }
  };

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

  const statusOptions = [
    "Pending",
    "Paid",
    "Shipped",
    "Completed",
    "Cancelled",
  ];

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
                  <TableHead>Bank Status</TableHead>
                  <TableHead>Order Code</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Delete Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(allOrders?.data) &&
                  allOrders?.data.map((order: any) => (
                    <TableRow
                      key={order._id}
                      className="border-neutral-400 text-center"
                    >
                      <TableCell>{order.user}</TableCell>
                      <TableCell>{order?._id || "01223sz"}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>{order?.status || "paid"}</TableCell>
                      <TableCell>
                        {order?.transaction?.sp_code || "99csd"}
                      </TableCell>
                      <TableCell>
                        {order?.transaction?.method || "shurjopay"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className={clsx(
                                order.status === "Pending" && "text-secondary",
                                order.status === "Paid" && "text-green-500",
                                order.status === "Shipped" && "text-blue-500",
                                order.status === "Completed" && "text-gray-500",
                                order.status === "Cancelled" && "text-red-500"
                              )}
                              size="sm"
                              disabled={loadingOrderId === order._id}
                            >
                              {loadingOrderId === order._id
                                ? "Updating..."
                                : order.status}
                              <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="border-neutral-300">
                            {statusOptions.map((status) => (
                              <DropdownMenuItem
                                className="cursor-pointer font-medium text-base bg-white border"
                                key={status}
                                onClick={() =>
                                  handleStatusChange(
                                    order._id,
                                    order.status,
                                    status
                                  )
                                }
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
              Are you sure you want to delete this order? This action cannot be
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

export default ManageOrders;
