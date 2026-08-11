import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Mirrors fresh-fish-dashboard/src/api/apiSlice.js: one generic RTK Query
// slice with path-based get/post/put/patch/delete endpoints, so every page
// that needs live data calls the same backend the dashboard writes to.

// Falls back to the deployed backend (not localhost) so a missing
// NEXT_PUBLIC_API_URL on Vercel doesn't break client-side data fetching.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://fresh-fish-backend.vercel.app/api";
export const API_BASE_URL = API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["KeyName"],
  endpoints: (builder) => ({
    get: builder.query<
      unknown,
      { path: string; params?: Record<string, string | number | boolean | undefined> }
    >({
      query: ({ path, params }) => ({
        url: path,
        method: "GET",
        params,
        headers: { Accept: "application/json" },
      }),
      providesTags: (result, error, { path }) =>
        result ? [{ type: "KeyName" as const, id: path }] : ["KeyName"],
    }),

    post: builder.mutation<unknown, { path: string; body?: unknown }>({
      query: ({ path, body }) => {
        const isFormData = body instanceof FormData;
        return {
          url: path,
          method: "POST",
          body,
          headers: isFormData
            ? { Accept: "application/json" } // let the browser set the multipart boundary
            : { "Content-Type": "application/json", Accept: "application/json" },
        };
      },
      invalidatesTags: ["KeyName"],
    }),

    put: builder.mutation<unknown, { path: string; body?: unknown }>({
      query: ({ path, body }) => ({
        url: path,
        method: "PUT",
        body,
        headers: { Accept: "application/json" },
      }),
      invalidatesTags: ["KeyName"],
    }),

    patch: builder.mutation<unknown, { path: string; body?: unknown }>({
      query: ({ path, body }) => ({
        url: path,
        method: "PATCH",
        body,
        headers: { Accept: "application/json" },
      }),
      invalidatesTags: ["KeyName"],
    }),

    delete: builder.mutation<unknown, { path: string }>({
      query: ({ path }) => ({
        url: path,
        method: "DELETE",
        headers: { Accept: "application/json" },
      }),
      invalidatesTags: ["KeyName"],
    }),
  }),
});

export const {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  usePatchMutation,
  useDeleteMutation,
} = apiSlice;

export default apiSlice.reducer;
