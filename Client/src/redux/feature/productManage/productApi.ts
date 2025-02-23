import { IProduct, TResponseRedux } from "../../../types/type";
import { baseApi } from "../../baseApi/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to add a new product
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products/add-product", 
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["product"],
    }),

    // Query to fetch all products with filters
    getAllProducts: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
        if (params.category) queryParams.append("category", params.category);
        if (params.inStock) queryParams.append("inStock", params.inStock);
        if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
        if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.page) queryParams.append("page", params.page.toString());

        return {
          url: `/products?${queryParams.toString()}`, 
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IProduct[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["product"],
    }),

    // Query to get a specific product by ID
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`, 
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    // Mutation to update a product
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/api/products/update-product/${productId}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["product"],
    }),

    // Mutation to delete a product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`, // 
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});


// Export hooks for API operations
export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
