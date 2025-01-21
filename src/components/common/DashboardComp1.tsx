import { axiosAuthInstance } from "@/axios.js";
import { cn } from "@/lib/utils.js";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge.js";
import { Card } from "../ui/card.js";
import { Separator } from "../ui/separator.js";

export default function DashboardComp1() {
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<any>(null);

  const getComp1SampleData = async () => {
    try {
      setLoading(true);
      const res = await axiosAuthInstance.get("/sample_assignment_api_1");
      setSampleData(res?.data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComp1SampleData();
  }, []);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
      {loading ? (
        <div className="col-span-3 flex items-center justify-center">
          <LoaderCircle size={28} className="text-blue-500" />
        </div>
      ) : (
        <>
          <StatCard title="Purchases" value={sampleData?.purchases} />
          <StatCard title="Revenue" value={`$${sampleData?.revenue}`} />
          <StatCard title="Refunds" value={`$${sampleData?.refunds}`} />
        </>
      )}
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <Card className=" rounded-2xl  p-6 shadow-lg  flex flex-col ">
      <h2 className="text-xl font-semibold ">{title}</h2>
      <Separator className="my-2" />
      <div className="flex items-end gap-2">
      <p
        className={cn(
          " text-3xl font-bold",
          value ? "opacity-100" : "opacity-50"
        )}
      >
        {value || "N/A"}
      </p>
      <Badge variant="default" className="bg-[#E1FEEC] rounded-full border-green-300"><span className="text-green-600">+32%</span></Badge>
      </div>
    </Card>
  );
}
