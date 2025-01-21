import { axiosAuthInstance } from "@/axios.js";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Button } from "../ui/button.js";
import { Card } from "../ui/card.js";
import { ChartContainer } from "../ui/chart.js";
import { Separator } from "../ui/separator.js";

const chartConfig = {
  score: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--accent))",
  },
};

export default function DashboardComp3() {
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState([{ score: 0, mobile: 0 }]);

  const getComp1SampleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosAuthInstance.get("/sample_assignment_api_3");
      setChartData(() => {
        const newData = {
          score: res?.data?.score,
          mobile: 100 - res?.data?.score,
        };
        return [newData];
      });

      setSampleData(res?.data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComp1SampleData();
  }, []);

  return (
    <Card className="rounded-2xl shadow-lg py-4 px-6">
      {loading && (
        <div className="flex justify-center items-center h-32">
          <LoaderCircle size={28} className="text-blue-500" />
        </div>
      )}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {!loading && !error && sampleData === null && (
        <div className="text-gray-500 text-center">No data available.</div>
      )}
      {!loading && sampleData && (
        <>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full min-w-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={0}
              startAngle={180}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {chartData[0]?.score}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            of 100 points
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="score"
                stackId="a"
                cornerRadius={10}
                fill="var(--color-score)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="mobile"
                fill="var(--color-mobile)"
                stackId="a"
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
          <Separator className="my-4" />
          <h1 className="text-xl font-semibold mb-2">{sampleData?.title}!</h1>
          <p className="text-md text-accent-foreground">
            {sampleData?.message}
          </p>
          <Button className="rounded-full mt-6" variant={"outline"}>
            Improve your score
          </Button>
        </>
      )}
    </Card>
  );
}
