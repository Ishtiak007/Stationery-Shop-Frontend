import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TReponseRedux } from "@/types/globalTypes";
import { TProducts } from "@/types/productTypes";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //all products
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/products/",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
      transformResponse: (response: TReponseRedux<{ result: TProducts[] }>) => {
        return {
          data: response?.data?.result,
          meta: response?.data,
        };
      },
    }),
    // add product
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["product"],
    }),

    // Update product
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["product"], // Invalidate the product cache to refresh data after update
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"], // Invalidate the product cache to refresh data after delete
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
