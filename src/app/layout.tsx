import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ProxyProvider } from "@/components/ProxyProvider/ProxyProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextGBA",
  description: "Play your favorite GameBoy games in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback="Loading...">
          <ProxyProvider>{children}</ProxyProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
