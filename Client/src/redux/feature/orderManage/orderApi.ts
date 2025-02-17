import { baseApi } from "../../baseApi/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add a new order (User places an order)
    addOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/order",
        method: "POST",
        body: orderInfo,
      }),
    }),

    // Get all orders for admin
    getAdminOrdersData: builder.query({
      query: (userEmail) => ({
        url: "/payment/get-admin-order-data",
        method: "PUT",
        body: { email: userEmail },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Get user's order data
    getUserOrdersData: builder.query({
      query: (userEmail) => ({
        url: "/payment/get-user-order-data",
        method: "PUT",
        body: { email: userEmail },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // Accept an order (Admin action)
    acceptOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/accept-order",
        method: "PUT",
        body: orderInfo,
      }),
    }),

    // Cancel an order (Fixed spelling mistake from "cencelOrder" to "cancelOrder")
    cancelOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/cancel-order",
        method: "PUT",
        body: orderInfo,
      }),
    }),

    // Delete an order (Fixed method to DELETE instead of PUT)
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/payment/delete-order/${orderId}`, // ID is now passed in the URL
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAdminOrdersDataQuery,
  useGetUserOrdersDataQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation, // Fixed spelling
  useDeleteOrderMutation,
} = orderApi;
