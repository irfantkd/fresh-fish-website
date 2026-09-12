import { createApi, fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { customerLogout } from "./customerAuthSlice";

// Mirrors fresh-fish-dashboard/src/api/apiSlice.js: one generic RTK Query
// slice with path-based get/post/put/patch/delete endpoints, so every page
// that needs live data calls the same backend the dashboard writes to.

// Always set via .env (committed, the shared default — e.g. the deployed
// backend on Vercel) and .env.local (gitignored, overrides it for local
// dev) — never hardcoded here.
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
export const API_BASE_URL = API_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Loosely typed to avoid a circular import with store.ts's RootState.
    const state = getState() as { customerAuth?: { token: string | null } };
    const token = state.customerAuth?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// If a logged-in customer's token is rejected (expired, or the account was
// banned), sign them out client-side so the UI reflects it immediately
// instead of silently failing every subsequent request.
const baseQueryWithCustomerLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    const state = api.getState() as { customerAuth?: { token: string | null } };
    if (result.error?.status === 401 && state.customerAuth?.token) {
      api.dispatch(customerLogout());
    }
    return result;
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithCustomerLogout,
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
