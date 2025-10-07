import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  FileText,
  BarChart3,
  Eye,
  Filter,
  ShoppingCart,
  Package,
  Star,
  TrendingUp as TrendingUpAlt,
  ExternalLink,
  Calendar,
  MapPin,
  User
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import { useCurrency } from "../hooks/useCurrency";

interface DashboardProps {
  onAddProduct?: () => void;
  onViewReports?: () => void;
  onViewInventory?: () => void;
  onViewOrders?: () => void;
}

export function Dashboard({ onAddProduct, onViewReports, onViewInventory, onViewOrders }: DashboardProps) {
  const { formatCurrency, convertCurrency } = useCurrency();

  // Mock data for dashboard metrics
  const kpiData = [
    {
      title: "Total Orders",
      value: "45,267",
      change: "+8.7%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Active Products",
      value: "1,234",
      change: "+15",
      trend: "up",
      icon: Package,
    },
  ];

  const electronicsSubcategories = [
    { name: "Mobiles & Accessories", value: 28, color: "#0088FE" },
    { name: "Computers & Accessories", value: 22, color: "#00C49F" },
    { name: "Cameras & Photography", value: 18, color: "#FFBB28" },
    { name: "Home Audio", value: 12, color: "#FF8042" },
    { name: "Home Theater, TV & Video", value: 10, color: "#8884D8" },
    { name: "Accessories", value: 6, color: "#82CA9D" },
    { name: "Car & Vehicle Electronics", value: 3, color: "#FFC658" },
    { name: "GPS & Accessories", value: 1, color: "#FF7C7C" },
  ];





  // Handle KPI card clicks
  const handleKpiClick = (kpiTitle: string) => {
    if (kpiTitle === "Total Orders") {
      onViewOrders?.();
    } else if (kpiTitle === "Active Products") {
      onViewInventory?.();
    }
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Processing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Shipped":
        return <Badge variant="outline" className="border-purple-200 text-purple-800">{status}</Badge>;
      case "In Stock":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Low Stock":
        return <Badge variant="destructive" className="bg-orange-100 text-orange-800 hover:bg-orange-100">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your e-commerce performance.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpiData.map((kpi, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => handleKpiClick(kpi.title)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className="flex items-center gap-2">
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs">
                {kpi.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {kpi.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Electronics Subcategories Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Electronics Sales by Subcategory</CardTitle>
            <CardDescription>Electronics product subcategory distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsPieChart>
                <Pie
                  data={electronicsSubcategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  labelLine={false}
                >
                  {electronicsSubcategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {electronicsSubcategories.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="truncate">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used features and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onAddProduct}
              >
                <Package className="h-6 w-6" />
                <span className="text-sm">Add Product</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onViewReports}
              >
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">View Reports</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onViewInventory}
              >
                <Activity className="h-6 w-6" />
                <span className="text-sm">Inventory</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onViewReports}
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>




    </div>
  );
}