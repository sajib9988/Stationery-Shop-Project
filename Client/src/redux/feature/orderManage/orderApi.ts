import { baseApi } from "../../baseApi/baseApi";
import { IOrder} from "../../../types/type";

type TResponseRedux<T> = {
  data: T;
  meta: any;
};

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allOrders: builder.query<TResponseRedux<IOrder[]>, void>({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<IOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["order", "verified"],
    }),

    revenue: builder.query({
      query: () => ({
        url: `/orders/revenue`,
        method: "GET",
      }),
      providesTags: ["revenue"],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
                   
      }),
      invalidatesTags: ["order", "product", "revenue"],
    }),

    verifyOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/verify`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order", "product","verified"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useAllOrdersQuery,
  useVerifyOrderMutation,
  useRevenueQuery,
} = orderApi;

export default orderApi;
