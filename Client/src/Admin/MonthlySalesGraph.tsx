import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import {  
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../components/ui/card";
import { useRevenueQuery } from "../redux/feature/orderManage/orderApi";

export function MonthlySalesGraph() {
  // API থেকে রেভিনিউ ডাটা আনছি
  const { data, isLoading, error } = useRevenueQuery(undefined);

  // console.log("Revenue Data:", data); // কনসোলে ডাটা চেক করুন

  // লোডিং হলে লোডিং মেসেজ দেখাবে
  if (isLoading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  // যদি এরর হয়, তাহলে এরর মেসেজ দেখাবে
  if (error) {
    return <div className="text-center text-red-500 font-medium">Error fetching data!</div>;
  }

  // ডাটা থেকে totalRevenue বের করা
  const totalRevenue = data?.data?.totalRevenue || 0; 

  // ৩০ দিনের জন্য ডাটা জেনারেট করা
  const monthlySalesData = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    sales: totalRevenue, 
  }));

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Last 30 Days</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlySalesData}>
            <XAxis dataKey="day" tick={false} /> 
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 12.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last month
        </div>
      </CardFooter>
    </Card>
  );
}
