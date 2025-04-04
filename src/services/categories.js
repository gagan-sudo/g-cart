import apiSlice from "./apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getCategoriesList: builder.query({
      query: () => "/products/category-list",
    }),
    getSingleCategory: builder.query({
      query: ({category}) => `/products/category/${category}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoriesListQuery,
useGetSingleCategoryQuery  } = categoriesApi;
