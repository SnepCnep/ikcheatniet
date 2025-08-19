import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Ik Cheat Niet",
  description: "Ik Cheat Niet, The solution to check and verify users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-background text-gray-900")}>
        {/* Navbar */}
        <SessionProvider >
          <Navbar />
        </SessionProvider >
        <Analytics />
        {/* Page Content */}
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
