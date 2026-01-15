"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeeklyChartProps {
  data: { day: string; completion: number }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly completion</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                borderColor: "hsl(var(--border))",
                background: "hsl(var(--popover))",
              }}
            />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
