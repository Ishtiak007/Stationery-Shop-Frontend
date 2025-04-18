/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useUpdateUserRoleMutation,
} from "@/redux/features/admin/adminApi";
import { MdDelete } from "react-icons/md";

const ManageUsers = () => {
  const { data: userData, isLoading, isFetching } = useAllUsersQuery(undefined);
  const usersInfo = userData?.data || [];

  // Hooks for update status and delete user
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

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

  // Handle updating the user status (active / blocked)
  const handleRoleChange = async (
    userId: string,
    currentRole: string,
    newRole: "admin" | "user"
  ) => {
    if (currentRole === newRole) return;

    setLoadingUserId(userId); // Set loading state for this user
    try {
      // Call the mutation to update the status
      const res = await updateUserRole({
        userId,
        role: newRole,
      }).unwrap();
      toast.success(res.message); // Show success message
    } catch (error: any) {
      toast.error(error.data.message); // Show error message
    } finally {
      setLoadingUserId(null); // Reset loading state
    }
  };

  // Handle deleting the user
  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        // Call the delete mutation
        await deleteUser(userToDelete).unwrap();
        toast.success("User deleted successfully!");
        closeModal(); // Close the modal after successful deletion
      } catch (error: any) {
        toast.error(error?.message || "Error deleting user");
      }
    }
  };

  // Open the confirmation modal
  const openModal = (userId: string) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  // Close the confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
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
              <TableRow className="border-neutral-400 text-primary-text font-bold text-[15px]">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remove User</TableHead>
                <TableHead>Update Role</TableHead>
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
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    {/* active and block */}
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
                            className="border-neutral-300"
                            size="sm"
                            disabled={loadingUserId === user._id}
                          >
                            {loadingUserId === user._id
                              ? "Updating..."
                              : user.status}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border-neutral-300">
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
                        className="text-red-400 cursor-pointer"
                        size={25}
                        onClick={() => openModal(user._id as string)} // Open modal when clicked
                      />
                    </TableCell>

                    {/* admin and user */}
                    <TableCell
                      className={clsx(
                        "flex items-center gap-2",
                        user.role === "admin" && "text-green-500",
                        user.role === "user" && "text-blue-500"
                      )}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="border-neutral-300"
                            size="sm"
                            disabled={loadingUserId === user._id}
                          >
                            {loadingUserId === user._id
                              ? "Updating..."
                              : user.role}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border-neutral-300">
                          <DropdownMenuItem
                            className="cursor-pointer border my-2"
                            onClick={() =>
                              handleRoleChange(
                                user._id as string,
                                user.role,
                                "admin"
                              )
                            }
                          >
                            Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer border"
                            onClick={() =>
                              handleRoleChange(
                                user._id as string,
                                user.role,
                                "user"
                              )
                            }
                          >
                            User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold">Confirm Deletion</h3>
            <p className="mt-4 text-sm text-gray-700">
              Are you sure you want to delete this user? This action cannot be
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
                onClick={handleDeleteUser} // Proceed with deletion
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

export default ManageUsers;
