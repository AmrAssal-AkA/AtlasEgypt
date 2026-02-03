import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import Footer from "@/components/Footer";
import Header from "@/components/main-navigation/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AtlasEgypt</title>
        <meta
          name="description"
          content="Explore The wonders of egypt and the hidden gems with AtlasEgypt"
        />
        <link rel="icon" href="/Favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
      <Footer />
      </SessionProvider>
    </>
  );
}
