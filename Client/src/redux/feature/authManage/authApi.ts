import { baseApi } from "../../baseApi/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
        credentials: 'include',
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => (
      // console.log("userInfo",userInfo),
        {

        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    logOut: builder.mutation({
      query: (info) => ({
        url: "/auth/logout",
        method: "POST",
        body:info
      }),
      invalidatesTags: ['allUser','updateUserPass']
    }),


    updateProfile: builder.mutation({
  query: (data: { email: string; [key: string]: string | number | boolean }) => {
    const { ...filteredData } = data; 
    return {
      url: "/auth/update-profile",
      method: "PATCH",
      body: filteredData,
    };
  },
  invalidatesTags: ["updateUserPass"],
}),



    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body:data
      }),
      
    }),
    authMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    providesTags:['updateUserPass']
    }),
  }),
});

export const {useLoginMutation,useLogOutMutation,useSignUpMutation,useAuthMeQuery,useUpdateProfileMutation,useUpdatePasswordMutation}=authApi 