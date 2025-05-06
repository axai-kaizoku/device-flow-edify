// app/providers.tsx   (or wherever your Providers live)
"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./app/store/store";
import StyledJsxRegistry from "./app/registry";
import { AlertProvider } from "./hooks/useAlert";
import { Toaster } from "./components/ui/sonner";
import "./app/globals.css";
import GlobalError from "./app/global-error";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [maintenance, setMaintenance] = useState(false);

  const [queryClient] = useState(() => {
    return new QueryClient({
      // 1) Global onError for *all* queries
      queryCache: new QueryCache({
        onError: (error) => {
          const status = (error as any)?.response?.status;
          // show maintenance on any 5xx
          if (status && `${status}`.startsWith("5")) {
            setMaintenance(true);
          }
        },
      }),
      // 2) Your existing defaults
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  });

  // 3) If a 5xx is tripped anywhere, short‑circuit to Maintenance
  if (maintenance) {
    return <GlobalError />;
  }

  // 4) Otherwise render your app
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
          refetchInterval={1500}
        >
          <StyledJsxRegistry>
            <AlertProvider>
            <GoogleOAuthProvider clientId="412478416030-gf7v408b3i0nmh8hrtl1850g1ojk02u9.apps.googleusercontent.com">
              {children}
              <Toaster position="top-center" duration={3000} />
              </GoogleOAuthProvider>
            </AlertProvider>
          </StyledJsxRegistry>
        </SessionProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}
