import { Pie, PieChart, Label } from "recharts"
import { CheckCircle2, XCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TodoPieChartProps } from "@/types/Todo"

export default function TodoPieChart({ data }: TodoPieChartProps) {
  const completedTasks = data.filter(task => task.state).length
  const incompleteTasks = data.filter(task => !task.state).length
  const totalTasks = data.length

  const chartData = [
    { name: "Completed", value: completedTasks, fill: "#b7bdf8" },
    { name: "Incomplete", value: incompleteTasks, fill: "#f9e4a1" },
  ]

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-1))",
    },
    incomplete: {
      label: "Incomplete",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card className="w-full max-w-md bg-sheet border-0 flex flex-col items-center">
      <CardHeader>
        <CardTitle className="text-white font-semibold">Tình trạng task</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <g>
                        <circle
                          cx={viewBox.cx}
                          cy={viewBox.cy}
                          r={55}
                          fill="rgba(0, 0, 0, 0.6)"
                        />
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-3xl font-bold fill-white"
                          >
                            {totalTasks}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="text-xs fill-gray-300"
                          >
                            Tổng số công việc
                          </tspan>
                        </text>
                      </g>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-[#b7bdf8]" />
            <span className="text-white font-semibold text-sm">Đã hoàn thành: {completedTasks}</span>
          </div>
          <div className="flex items-center">
            <XCircle className="mr-2 h-4 w-4 text-[#f9e4a1]" />
            <span className="text-white font-semibold text-sm">Chưa hoàn thành: {incompleteTasks}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}