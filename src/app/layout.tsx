import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <SessionProvider >
            <Navbar />
          </SessionProvider >
          {/* Page Content */}
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
