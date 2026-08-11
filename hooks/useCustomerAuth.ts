"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { customerLogout } from "@/store/customerAuthSlice";

export function useCustomerAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.customerAuth.token);
  const customer = useSelector((state: RootState) => state.customerAuth.customer);
  const isAuthenticated = useSelector((state: RootState) => state.customerAuth.isAuthenticated);

  function logout() {
    dispatch(customerLogout());
  }

  return { token, customer, isAuthenticated, logout };
}
