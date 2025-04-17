import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user status update
    userProfileUpdate: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // update status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["orders"],
    }),

    // delete order
    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),

    // update status
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["user"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`, // Make sure the URL matches your backend route
        method: "DELETE", // Using DELETE method
      }),
      invalidatesTags: ["user"], // You may want to invalidate the "user" tag to refresh data after deletion
    }),
  }),
});

export const {
  useUserProfileUpdateMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = adminApi;
