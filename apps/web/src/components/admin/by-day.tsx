"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { admin } from "@/lib/admin";
import { Heading } from "../typography";

export default function ByDay() {
  const byDayQuery = admin.stats.byDay.useQuery();

  return [
    <Card className="border lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <Heading size="h4">Projects (Last 30 Days)</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="text-2xl font-bold">{totalSignups}</div> */}
        {/* <p className="text-muted-foreground text-xs">+20.1% from last month</p> */}
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={byDayQuery.data?.projects}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="count"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    "--theme-primary": `hsl(267 100% 73%)`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>,
  ];
}
