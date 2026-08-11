"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { useGetQuery } from "@/store/apiSlice";
import { setCustomer } from "@/store/customerAuthSlice";
import type { Customer } from "@/types";

/** Rehydrates the logged-in customer's profile on load — only the JWT
 * persists in localStorage across page reloads, not the profile itself. */
export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.customerAuth.token);
  const { data } = useGetQuery({ path: "/customers/me" }, { skip: !token });

  useEffect(() => {
    if (data) dispatch(setCustomer(data as Customer));
  }, [data, dispatch]);

  return <>{children}</>;
}
