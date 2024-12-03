import { LinksContextProvider } from "@/app/context/ListContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lista pozycji menu",
  description: "Lista pozycji menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <LinksContextProvider>
        <body>{children}</body>
      </LinksContextProvider>
    </html>
  );
}
