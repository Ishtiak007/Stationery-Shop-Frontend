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
    AddProducts: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // Update product with image
    updateProductWithImage: builder.mutation({
      query: ({ productId, data }) => {
        const formData = new FormData();
        if (data.file) {
          formData.append("file", data.file);
        }
        const payload = { ...data };
        delete payload.file;
        formData.append("data", JSON.stringify(payload));

        return {
          url: `/products/update-product/${productId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductsMutation,
  useDeleteProductMutation,
  useUpdateProductWithImageMutation,
} = productsApi;
