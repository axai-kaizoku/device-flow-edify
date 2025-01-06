"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "./app/store/store";
import "react-toastify/dist/ReactToastify.css";
import StyledJsxRegistry from "./app/registry";
import { Slide, ToastContainer } from "react-toastify";
import "./app/globals.css";
import { AlertProvider } from "./hooks/useAlert";

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
            <AlertProvider>{children}</AlertProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              // toastClassName={(ctx) =>
              //   "relative flex p-1 min-h-20 h-16 w-32 text-black min-w-16 rounded-xl  backdrop-blur-3xl bg-slate-300 justify-between overflow-hidden cursor-pointer"
              // }

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
          </ThemeProvider>
        </StyledJsxRegistry>
      </SessionProvider>
    </Provider>
  );
}
