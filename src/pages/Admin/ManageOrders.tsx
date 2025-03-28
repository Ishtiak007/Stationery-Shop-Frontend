/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetOrdersQuery } from "@/redux/features/order/orderApi.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/features/admin/adminApi";
import { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import Loading from "@/components/ui/Loading";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineDelete } from "react-icons/md";

const ManageOrders = () => {
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const {
    data: allOrders,
    isFetching,
    isLoading,
  } = useGetOrdersQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation(undefined);

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

  if (isLoading) {
    return <Loading />;
  }
  const myData = allOrders?.data || [];

  const statusOptions = [
    "Pending",
    "Paid",
    "Shipped",
    "Completed",
    "Cancelled",
  ];

  const handleDeleteOrder = async (orderId: string) => {
    try {
      // Trigger delete order mutation
      await deleteOrder(orderId);
      toast.success("Order deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete the order");
    }
  };
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
                {Array.isArray(myData) &&
                  myData.map((order: any) => (
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
                          <DropdownMenuContent className=" border-neutral-300">
                            {/* Iterate over the statusOptions and render each as a DropdownMenuItem */}
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
                          onClick={() => handleDeleteOrder(order._id)}
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
    </>
  );
};

export default ManageOrders;
