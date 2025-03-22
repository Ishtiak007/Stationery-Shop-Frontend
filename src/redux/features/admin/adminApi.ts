import { baseApi } from "@/redux/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userStatusUpdate: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`, // Specify the path to your API endpoint
        method: "DELETE", // Use the DELETE method
      }),
      // Invalidate the 'orders' cache after deletion
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useUserStatusUpdateMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = adminApi;
