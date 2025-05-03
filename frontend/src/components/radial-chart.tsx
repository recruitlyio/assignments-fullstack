"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Component({
  data,
}: {
  data: { title: string; score: number; description: string };
}) {
  const chartData = [
    { browser: "safari", visitors: data.score, fill: "var(--color-safari)" },
  ];
  const [description, setDescription] = React.useState({
    status: false,
    description: data.description,
  });
  return (
    <Card className="flex min-w-[300px] max-w-[250px] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={data.score * 3.6}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <div className="flex flex-col">
          <Button
            className="bg-primary cursor-pointer rounded-md py-2 px-6 hover:bg-primary-dark disabled:opacity-50"
            onClick={() =>
              setDescription({
                status: !description.status,
                description: data.description,
              })
            }
          >
            {description.status ? "Hide" : "Show"} Details
          </Button>
          <div className="max-w-full p-2">
            {
              description.status &&
                // <span className="text-sm text-muted-foreground">
                description.description
              // </span>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
