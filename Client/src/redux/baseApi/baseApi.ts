import { fetchBaseQuery, createApi, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../feature/authManage/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include", 
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // console.log("🔑 Sending Access Token:", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("🚀 API Response Before Refresh:", result);

  if (result?.error?.status === 401) {
    console.log("🔄 Access Token Expired! Refreshing...");

    const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    // console.log("🔑 New Token Received:", data);

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: data.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  // console.log("🚀 API Response After Refresh:", result);
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["User", "Product",'allUser','updateUserPass',"allUser"],
  endpoints: () => ({}),
});
