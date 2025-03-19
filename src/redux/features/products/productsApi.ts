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
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useAddProductMutation } = productsApi;
