import { useEffect, useState } from "react";
import { Card } from "../ui/card.js";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart.js";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import supabase from "@/utils/supabse.js";
import { LoaderCircle } from "lucide-react";

const chartConfig = {
  web_sales: {
    label: "Web Sales",
    color: "#2563eb",
  },
  offline_sales: {
    label: "Offline Sales",
    color: "#60a5fa",
  },
};

export default function DashboardComp4() {
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const getComp1SampleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("sample_data4").select("*");
      if (error) throw error;
      console.log(data);

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
        <h1 className="text-xl font-semibold mb-2">Customers by device</h1>
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
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={sampleData}

            >
              <CartesianGrid vertical={false} horizontal={true} />
              <YAxis tickLine={false} axisLine={false}  />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="web_sales"
                type="monotone"
                stroke="var(--color-web_sales)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="offline_sales"
                type="monotone"
                stroke="var(--color-offline_sales)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
    </Card>
  );
}
