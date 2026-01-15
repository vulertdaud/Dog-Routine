"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { BottomNav } from "@/components/bottom-nav";
import { cn } from "@/lib/utils";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      <div className="flex min-h-screen">
        <Sidebar />
        <main
          className={cn(
            "flex-1 px-4 pb-20 pt-6 md:px-10 md:pb-10",
            pathname === "/today" ? "max-w-6xl" : "max-w-6xl"
          )}
        >
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
