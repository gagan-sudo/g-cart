import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/urls";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: () => ({}), // Empty endpoints, to be injected later
});

export default apiSlice;
