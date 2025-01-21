import { useEffect, useState } from "react";
import { Card } from "../ui/card.js";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart.js";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import supabase from "@/utils/supabse.js";
import DashboardComp6 from "./DashboardComp6.js";
import { LoaderCircle } from "lucide-react";

const chartConfig = {
  last_year: {
    label: "This Year",
    color: "#2563eb",
  },
  this_year: {
    label: "Last Year",
    color: "#60a5fa",
  },
};

export default function DashboardComp2() {
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const getComp1SampleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("sample_data2").select("*");
      if (error) throw error;
      setSampleData(data || []);
    } catch (error: any) {
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
    <Card className="min-h-[100vh] flex-1 flex flex-col gap-6 rounded-2xl bg-muted/20 md:min-h-min shadow-lg p-4">
      <div className="flex-1">
        <h1 className="text-xl font-semibold mb-2">Comparison</h1>
        {loading && (
          <div className="flex justify-center items-center h-32">
            <LoaderCircle size={28} className="text-blue-500" />
          </div>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {!loading && !error && sampleData.length === 0 && (
          <div className="text-gray-500 text-center">No data available.</div>
        )}
        {!loading && sampleData.length > 0 && (
          <ChartContainer config={chartConfig} className="w-full">
            <BarChart accessibilityLayer data={sampleData}>
              <CartesianGrid vertical={true} horizontal={true} />
              <YAxis tickLine={false} axisLine={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="last_year"
                fill={chartConfig.last_year.color}
                radius={4}
              />
              <Bar
                dataKey="this_year"
                fill={chartConfig.this_year.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        )}
      </div>
      <div className="flex-1">
        <DashboardComp6 />
      </div>
    </Card>
  );
}
