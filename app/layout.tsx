import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dog Routine Manager",
  description: "Track daily routines and care tasks for your dog.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
