import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Index from "@/components/Navigation/Index";
import ErrorBoundary from "./_error";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function App({ Component, pageProps }) {
  console.log(poppins);
  return (
    <>
      {/* <Index /> */}

      <ErrorBoundary>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </ErrorBoundary>
    </>
  );
}
