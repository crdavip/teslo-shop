import type { Metadata } from "next";
import { tesloFont } from "@/config";
import { Providers } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Inicio - Teslo | Shop",
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${tesloFont.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
