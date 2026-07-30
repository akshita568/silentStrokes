import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthProvider/AuthProvider"; 
import { CartProvider } from "./context/CartProvider"; 
import "./index.css";
import Router from "./router/Router.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <RouterProvider router={Router} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);