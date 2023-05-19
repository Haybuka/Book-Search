import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Index from "@/components/Navigation/Index";
import ErrorBoundary from "./_error";
import { createContext } from "react";
import { StoreProvider } from "@/context/store-context";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <Index /> */}
      <Index />

      <ErrorBoundary>
        <StoreProvider>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </StoreProvider>
      </ErrorBoundary>
    </>
  );
}
