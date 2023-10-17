"use client";

import { admin } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { Heading } from "../typography";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function SkeletonStat({ title }: { title: string }) {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>
          <Heading size="h4">{title}</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-3xl font-bold">0</div>
        <div className="text-muted-foreground/10 text-sm">
          +0 from last month
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminStats() {
  const statsQuery = admin.stats.stats.useQuery();

  if (!statsQuery.data) {
    return [
      <SkeletonStat key="Total Users" title="Total Users" />,
      <SkeletonStat key="Sign Ups" title="Sign Ups" />,
      <SkeletonStat key="Sign Ins" title="Sign Ins" />,
      <SkeletonStat key="Projects" title="Projects" />,
    ];
  }

  return statsQuery.data?.map((stat) => (
    <Card key={stat.title} className="col-span-1 border">
      <CardHeader>
        <CardTitle>
          <Heading size="h4">{stat.title}</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{stat.value}</div>
        <div
          className={cn(
            "text-muted-foreground text-sm",
            stat.change >= 0 ? "text-green-400" : "text-red-400",
          )}
        >
          {stat.change >= 0 ? "+" : "-"}
          {stat.change} from last month
        </div>
      </CardContent>
    </Card>
  ));
}
