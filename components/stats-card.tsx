import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
