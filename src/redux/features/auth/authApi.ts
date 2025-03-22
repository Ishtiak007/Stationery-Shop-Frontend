import { baseApi } from "@/redux/api/baseApi";
import { TReponseRedux } from "@/types/globalTypes";
import { TUser } from "@/types/userTypes";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // register
    register: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    // get me
    getMe: builder.query({
      query: () => {
        return {
          url: "/users/me",
          method: "GET",
        };
      },
      providesTags: ["user"],
      transformResponse: (response: TReponseRedux<TUser>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    // all user
    AllUsers: builder.query({
      query: () => {
        return {
          url: "/users/all-users",
          method: "GET",
        };
      },
      providesTags: ["user"],
      transformResponse: (response: TReponseRedux<TUser>) => {
        return {
          data: response?.data,
          meta: response.meta,
        };
      },
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useRegisterMutation,
  useAllUsersQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} = authApi;
