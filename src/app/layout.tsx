import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "sonner";

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "O Detetive do Insta",
  description: "O Detetive do Insta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased`}
      >
        <DataProvider>
          {children}

          <Toaster position="top-center" expand={false} visibleToasts={2} />
        </DataProvider>
      </body>
    </html>
  );
}
