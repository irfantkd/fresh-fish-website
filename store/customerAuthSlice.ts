import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer } from "@/types";

const STORAGE_KEY = "ffd_customer_token";

function loadPersistedToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

interface CustomerAuthState {
  token: string | null;
  customer: Customer | null;
  isAuthenticated: boolean;
}

const initialState: CustomerAuthState = {
  token: loadPersistedToken(),
  customer: null,
  isAuthenticated: Boolean(loadPersistedToken()),
};

const customerAuthSlice = createSlice({
  name: "customerAuth",
  initialState,
  reducers: {
    setCustomerCredentials: (
      state,
      action: PayloadAction<{ token: string; customer: Customer }>
    ) => {
      state.token = action.payload.token;
      state.customer = action.payload.customer;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, state.token);
      }
    },
    setCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
    customerLogout: (state) => {
      state.token = null;
      state.customer = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const { setCustomerCredentials, setCustomer, customerLogout } =
  customerAuthSlice.actions;

export default customerAuthSlice.reducer;
