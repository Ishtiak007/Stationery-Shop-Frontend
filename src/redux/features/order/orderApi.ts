import { baseApi } from "@/redux/api/baseApi";
import { TReponseRedux } from "@/types/globalTypes";
import { Order } from "@/types/orderDetailsTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["orders"],
    }),
    getOrders: builder.query({
      query: () => {
        return {
          url: "/orders",
          method: "GET",
        };
      },
      providesTags: ["orders"],
      transformResponse: (response: TReponseRedux<{ result: Order[] }>) => {
        return {
          data: response?.data,
          meta: response?.data,
        };
      },
    }),
    verifyOrder: builder.query({
      query: (order_id) => {
        return {
          url: "/orders/verification",
          params: { order_id },
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
} = orderApi;
