import apiSlice from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
    }),
    getProductsList: builder.query({
      query: () => `/products?limit=5&skip=0`
    }),
    getProductById: builder.query({
      query: ({id}) =>  `/product/${id}`
    })
  }),
});

export const { useGetProductsQuery , useGetProductsListQuery,useLazyGetProductsQuery,useGetProductByIdQuery } = productApi;
