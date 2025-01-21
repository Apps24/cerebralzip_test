import supabase from "@/utils/supabse.js";
import { LoaderCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.js";

export default function DashboardComp6() {
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const getComp1SampleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("sample_data6").select("*");
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
    <div>
      <h1 className="text-xl font-semibold mb-4">Top Products</h1>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Sold Amount</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((item:any) => (
              <TableRow className="border-none" key={item.id}>
                <TableCell className="font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />{" "}
                  {item?.product}
                </TableCell>
                <TableCell>{item?.sold_amount}</TableCell>
                <TableCell>${item?.unit_price.toFixed(2)}</TableCell>
                <TableCell>${item?.revenue.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Star size={12} color="#FFD700" fill="#FFD700" />{" "}
                    {item?.rating}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
