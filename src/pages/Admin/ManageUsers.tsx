import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";
import { useAllUsersQuery } from "@/redux/features/auth/authApi";
import { TUser } from "@/types/userTypes";
import {
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from "@/redux/features/admin/adminApi";
import { MdDelete } from "react-icons/md";

const ManageUsers = () => {
  const { data: userData, isLoading, isFetching } = useAllUsersQuery(undefined);
  const usersInfo = userData?.data || [];

  // Hooks for update status and delete user
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Handle updating the user status (active / blocked)
  const handleStatusChange = async (
    userId: string,
    currentStatus: string,
    newStatus: "active" | "blocked"
  ) => {
    if (currentStatus === newStatus) return;

    setLoadingUserId(userId); // Set loading state for this user
    try {
      // Call the mutation to update the status
      const res = await updateUserStatus({
        userId,
        status: newStatus,
      }).unwrap();
      toast.success(res.message); // Show success message
    } catch (error: any) {
      toast.error(error.data.message); // Show error message
    } finally {
      setLoadingUserId(null); // Reset loading state
    }
  };

  // Handle deleting the user
  const handleDeleteUser = async (userId: string) => {
    try {
      // Call the delete mutation
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Error deleting user");
    }
  };

  if (isFetching && isLoading) {
    return <Loading />; // Show loading spinner if data is fetching
  }

  return (
    <>
      <div className="font-orbitron">
        <h2 className="text-2xl px-1 font-black text-primary-text dark:text-white">
          Manage Users
        </h2>
        <div className="mt-10">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-400 text-primary-text font-semibold text-[10px]">
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(usersInfo) &&
                usersInfo?.map((user: TUser) => (
                  <TableRow
                    key={user._id}
                    className="border-neutral-400 text-primary-text text-[10px] md:text-[14px] lg:text-sm font-serif"
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell
                      className={clsx(
                        "flex items-center gap-2",
                        user.status === "active" && "text-green-500",
                        user.status === "blocked" && "text-red-500"
                      )}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className=" border-neutral-300"
                            size="sm"
                            disabled={loadingUserId === user._id}
                          >
                            {loadingUserId === user._id
                              ? "Updating..."
                              : user.status}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=" bg-white border-neutral-300">
                          <DropdownMenuItem
                            className="cursor-pointer border my-2"
                            onClick={() =>
                              handleStatusChange(
                                user._id as string,
                                user.status,
                                "active"
                              )
                            }
                          >
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer border"
                            onClick={() =>
                              handleStatusChange(
                                user._id as string,
                                user.status,
                                "blocked"
                              )
                            }
                          >
                            Blocked
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      <MdDelete
                        className="text-red-500 cursor-pointer"
                        size={25}
                        onClick={() => handleDeleteUser(user._id as string)} // Add click handler to delete
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
