import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "sonner";
import { Parkinsans } from "next/font/google"

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  fallback: ["Verdana"],
});

export const metadata: Metadata = {
  title: "Artify",
  description: "Create AI Images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="shortcut icon"
        href="/logo.png"
        type="image/x-icon"
      />
      <body className={`${parkinsans.variable} antialiased`}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
