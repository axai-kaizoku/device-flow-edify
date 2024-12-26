"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "./app/store/store";
import StyledJsxRegistry from "./app/registry";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
        refetchInterval={1500}
      >
        <StyledJsxRegistry>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </StyledJsxRegistry>
      </SessionProvider>
    </Provider>
  );
}
