import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
      <link rel="shortcut icon" href="https://res.cloudinary.com/drynqkitl/image/upload/v1740221612/Artify_uda5oc.png" type="image/x-icon" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
        <Toaster />
        <AppSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

