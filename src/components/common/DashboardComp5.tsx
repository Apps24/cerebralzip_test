import { axiosAuthInstance } from "@/axios.js";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button.js";
import { Card } from "../ui/card.js";
import { Separator } from "../ui/separator.js";
import MultiProgress from "react-multi-progress";

export default function DashboardComp5() {
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<any>(null);
  const [ogData, setOgData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getComp1SampleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosAuthInstance.get("/sample_assignment_api_5");

      setOgData(res?.data);
      setSampleData(adjustDataEqually(res?.data));
    } catch (error) {
      console.error("Error fetching sample data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  function adjustDataEqually(data: any) {
    const total = data.negative + data.positive + data.neutral;
    const adjustment = 100 - total;
    const adjustmentPerValue = adjustment / 3;

    return {
      negative: data.negative + adjustmentPerValue,
      positive: data.positive + adjustmentPerValue,
      neutral: data.neutral + adjustmentPerValue,
    };
  }

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
          <p className="text-sidebar-accent-foreground text-sm mb-1.5">
            Community Feedback
          </p>
          <p className=" text-lg font-semibold mb-4">Mostly Positive</p>
          <MultiProgress
            round={true}
            elements={[
              {
                value: sampleData?.negative,
                color: "#FEA6A8",
              },
              {
                value: sampleData?.neutral,
                color: "#FFCD8E",
              },
              {
                value: sampleData?.positive,
                color: "#8EEDB4",
              },
            ]}
          />
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sidebar-accent-foreground text-sm mb-1.5">
                Negative
              </p>
              <p className="text-md font-medium">{ogData?.negative}</p>
            </div>
            <div>
              <p className="text-sidebar-accent-foreground text-sm mb-1.5">
                Neutral
              </p>
              <p className="text-md font-medium">{ogData?.neutral}</p>
            </div>
            <div>
              <p className="text-sidebar-accent-foreground text-sm mb-1.5">
                Positive
              </p>
              <p className="text-md font-medium">{ogData?.positive}</p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
