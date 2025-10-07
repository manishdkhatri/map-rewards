import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  CalendarIcon, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Eye,
  FileText,
  Filter,
  Search
} from "lucide-react";
import { format, subDays } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useCurrency } from "../hooks/useCurrency";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function ReportsAnalytics() {
  const { formatCurrency, setCurrency } = useCurrency();
  
  // Set currency to INR for this component
  useEffect(() => {
    setCurrency("INR");
  }, [setCurrency]);
  
  // Form state
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [features, setFeatures] = useState({
    activeStock: false,
    soldStock: false,
    addToCart: false
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [showResults, setShowResults] = useState(false);

  // Report configuration
  const reportTypes = [
    { id: "inventory", name: "Inventory Report", description: "Stock levels and inventory analysis" },
    { id: "sales", name: "Sales Report", description: "Sales performance and trends" },
    { id: "product", name: "Product Report", description: "Product performance metrics" },
    { id: "customer", name: "Customer Report", description: "Customer behavior analysis" }
  ];

  // Electronics subcategories
  const electronicsSubcategories = [
    { id: "smartphones", name: "Smartphones & Mobile Phones" },
    { id: "laptops", name: "Laptops & Computers" },
    { id: "tablets", name: "Tablets & E-readers" },
    { id: "audio", name: "Audio & Headphones" },
    { id: "cameras", name: "Cameras & Photography" },
    { id: "gaming", name: "Gaming & Consoles" },
    { id: "wearables", name: "Smartwatches & Wearables" },
    { id: "accessories", name: "Mobile Accessories" },
    { id: "home_audio", name: "Home Audio & Speakers" },
    { id: "storage", name: "Storage & Memory" },
    { id: "networking", name: "Networking & WiFi" },
    { id: "monitors", name: "Monitors & Displays" }
  ];

  // Mock data for results - updated for electronics (amounts in INR)
  const mockInsights = {
    totalProducts: 156,
    activeStock: 1247,
    soldStock: 823,
    addToCartCount: 1456,
    topPerformingProduct: "Premium Wireless Headphones",
    revenue: 10495845 // Revenue in Indian Rupees (₹1,04,95,845)
  };

  const mockChartData = [
    { name: "Jan", active: 1200, sold: 800, addToCart: 1400 },
    { name: "Feb", active: 1350, sold: 750, addToCart: 1520 },
    { name: "Mar", active: 1180, sold: 920, addToCart: 1380 },
    { name: "Apr", active: 1420, sold: 680, addToCart: 1650 },
    { name: "May", active: 1247, sold: 823, addToCart: 1456 },
  ];

  const mockProductDistribution = [
    { name: "Smartphones", value: 35, color: "#0088FE" },
    { name: "Laptops & Computers", value: 28, color: "#00C49F" },
    { name: "Audio & Headphones", value: 22, color: "#FFBB28" },
    { name: "Gaming & Consoles", value: 15, color: "#FF8042" }
  ];

  const handleFeatureChange = (feature: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleGenerateReport = () => {
    if (selectedReportType && selectedSubcategory && Object.values(features).some(f => f)) {
      setShowResults(true);
    }
  };

  const handleDownloadReport = () => {
    // Mock download functionality
    const reportData = {
      reportType: selectedReportType,
      category: "Electronics",
      subcategory: selectedSubcategory,
      features,
      dateRange,
      insights: mockInsights,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `electronics-report-${selectedReportType}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setSelectedReportType("");
    setSelectedSubcategory("");
    setFeatures({ activeStock: false, soldStock: false, addToCart: false });
    setShowResults(false);
  };

  const isFormValid = selectedReportType && selectedSubcategory && Object.values(features).some(f => f);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
        
          <h1 className="text-3xl font-semibold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate detailed reports and insights for electronics products
          </p>
        </div>
        {showResults && (
          <Button variant="outline" onClick={resetForm}>
            <Filter className="mr-2 h-4 w-4" />
            New Report
          </Button>
        )}
      </div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Report Type</CardTitle>
                <CardDescription>Select the type of report you want to generate</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex flex-col items-start">
                          <span>{type.name}</span>
                          <span className="text-sm text-muted-foreground">{type.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Report Category - Fixed to Electronics */}
            {selectedReportType && (
              <Card>
                <CardHeader>
                  <CardTitle>Report Category</CardTitle>
                  <CardDescription>Category is set to Electronics for all reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>Electronics</span>
                    <Badge variant="secondary" className="ml-auto">Fixed</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Report Subcategory Selection */}
            {selectedReportType && (
              <Card>
                <CardHeader>
                  <CardTitle>Report Subcategory</CardTitle>
                  <CardDescription>Select the specific electronics subcategory for your report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose electronics subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {electronicsSubcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Features Selection */}
            {selectedSubcategory && (
              <Card>
                <CardHeader>
                  <CardTitle>Report Features</CardTitle>
                  <CardDescription>Select the data points to include in your report</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="activeStock"
                      checked={features.activeStock}
                      onCheckedChange={() => handleFeatureChange('activeStock')}
                    />
                    <Label htmlFor="activeStock" className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Active Stock
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="soldStock"
                      checked={features.soldStock}
                      onCheckedChange={() => handleFeatureChange('soldStock')}
                    />
                    <Label htmlFor="soldStock" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Sold Stock
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="addToCart"
                      checked={features.addToCart}
                      onCheckedChange={() => handleFeatureChange('addToCart')}
                    />
                    <Label htmlFor="addToCart" className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Date Range & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Date Range</CardTitle>
                <CardDescription>Select the time period for your report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selected Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedReportType && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {reportTypes.find(t => t.id === selectedReportType)?.name}
                    </Badge>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Electronics
                  </Badge>
                </div>
                {selectedSubcategory && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {electronicsSubcategories.find(s => s.id === selectedSubcategory)?.name}
                    </Badge>
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {features.activeStock && <Badge variant="default" className="text-xs">Active Stock</Badge>}
                  {features.soldStock && <Badge variant="default" className="text-xs">Sold Stock</Badge>}
                  {features.addToCart && <Badge variant="default" className="text-xs">Add to Cart</Badge>}
                </div>
                <Separator />
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={!isFormValid}
                  className="w-full"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          {/* Report Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {reportTypes.find(t => t.id === selectedReportType)?.name} - Electronics - {
                      electronicsSubcategories.find(s => s.id === selectedSubcategory)?.name
                    }
                  </CardTitle>
                  <CardDescription>
                    Report generated for {dateRange.from && format(dateRange.from, "MMM dd, yyyy")} - {dateRange.to && format(dateRange.to, "MMM dd, yyyy")}
                  </CardDescription>
                </div>
                <Button onClick={handleDownloadReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockInsights.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Products analyzed</p>
              </CardContent>
            </Card>

            {features.activeStock && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Stock</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockInsights.activeStock.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Units available</p>
                </CardContent>
              </Card>
            )}

            {features.soldStock && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sold Stock</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockInsights.soldStock.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Units sold</p>
                </CardContent>
              </Card>
            )}

            {features.addToCart && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Add to Cart</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockInsights.addToCartCount.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Cart additions</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    {features.activeStock && <Line type="monotone" dataKey="active" stroke="#0088FE" strokeWidth={2} />}
                    {features.soldStock && <Line type="monotone" dataKey="sold" stroke="#00C49F" strokeWidth={2} />}
                    {features.addToCart && <Line type="monotone" dataKey="addToCart" stroke="#FFBB28" strokeWidth={2} />}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Electronics Distribution</CardTitle>
                <CardDescription>Product performance by electronics subcategory</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockProductDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      labelLine={false}
                    >
                      {mockProductDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Product Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Electronics Insights</CardTitle>
              <CardDescription>Key findings from your electronics report data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4>Top Performing Product</h4>
                  <p className="text-sm text-muted-foreground">{mockInsights.topPerformingProduct}</p>
                </div>
                <div>
                  <h4>Total Revenue</h4>
                  <p className="text-sm text-muted-foreground">{formatCurrency(mockInsights.revenue)}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4>Report Summary</h4>
                <p className="text-sm text-muted-foreground">
                  This report analyzes {mockInsights.totalProducts} products in the {
                    electronicsSubcategories.find(s => s.id === selectedSubcategory)?.name
                  } subcategory of Electronics. 
                  {features.activeStock && ` Current active stock stands at ${mockInsights.activeStock.toLocaleString()} units.`}
                  {features.soldStock && ` A total of ${mockInsights.soldStock.toLocaleString()} units have been sold.`}
                  {features.addToCart && ` Products were added to cart ${mockInsights.addToCartCount.toLocaleString()} times.`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}