"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "./app/store/store";
import "react-toastify/dist/ReactToastify.css";
import StyledJsxRegistry from "./app/registry";
import { Slide, ToastContainer } from "react-toastify";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app/globals.css";
import { AlertProvider } from "./hooks/useAlert";
import { Toaster } from "./components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
          refetchInterval={1500}
        >
          <StyledJsxRegistry>
            {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
            <AlertProvider>
              {children}

              <Toaster position="top-center" duration={3000} />
            </AlertProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              toastClassName={(ctx) =>
                "relative flex min-h-20 h-20 items-center w-full text-black min-w-16 rounded-xl backdrop-blur-3xl  justify-between overflow-hidden border border-gray-800 cursor-pointer"
              }
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              role="alert"
              pauseOnHover
              theme="light"
              transition={Slide}
              stacked
            />
            {/* </ThemeProvider> */}
          </StyledJsxRegistry>
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
}
