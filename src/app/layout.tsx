import type { Metadata } from "next";
import { tesloFont } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tesloFont.className} antialiased`}>{children}</body>
    </html>
  );
}
