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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-border/60 bg-background/80 px-6 py-8 md:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <PawPrint className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Dog Routine Manager</p>
          <p className="text-lg font-semibold">Daily Dashboard</p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Tip</p>
        <p className="mt-1">Tap any task to leave a quick note or set a reminder.</p>
      </div>
    </aside>
  );
}
