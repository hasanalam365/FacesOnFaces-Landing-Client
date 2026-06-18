import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes/Routes.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const queryClient = new QueryClient();

const stripePromise = loadStripe(
  import.meta.env.VITE_PAYMENT_STRIPE_PUBLISHABLE_KEY
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />

          <ToastContainer />
        </Elements>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
