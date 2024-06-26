import ParticlesBackgroud from "@/components/ParticleBackground";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import WalletProvider from "@/provider/WalletProvider";
import { useEffect, useState } from "react";
import SocketProvider from "@/provider/SocketProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <WalletProvider>
      <SocketProvider>
        <ParticlesBackgroud />
        <Header />

        <Component {...pageProps} />
        <Footer />
        <Toaster />
      </SocketProvider>
    </WalletProvider>
  );
}
