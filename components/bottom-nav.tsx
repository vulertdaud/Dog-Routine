"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChartLine,
  PawPrint,
  Settings,
  ListChecks,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/today", label: "Today", icon: ListChecks },
  { href: "/routine", label: "Routine", icon: PawPrint },
  { href: "/history", label: "History", icon: CalendarDays },
  { href: "/analytics", label: "Analytics", icon: ChartLine },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 w-[90%] -translate-x-1/2 rounded-3xl border border-border/60 bg-background/90 px-2 py-2 shadow-lg backdrop-blur md:hidden">
      <ul className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
