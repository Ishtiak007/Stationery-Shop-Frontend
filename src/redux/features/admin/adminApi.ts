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
  }),
});

export const {
  useUserProfileUpdateMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useUpdateUserStatusMutation,
} = adminApi;
