import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { 
  ClipboardList,
  Eye,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  RefreshCw,
  Download,
  ShoppingCart,
  Copy,
  Truck,
  CreditCard,
  Filter,
  Search,
  X,
  CalendarDays,
  User,
  Calendar
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function OrderManagement() {
  // Filter states
  const [orderFilters, setOrderFilters] = useState({
    statuses: [],
    dateRange: { start: "", end: "" },
    pointsRange: { min: "", max: "" },
    customer: ""
  });

  const [isOrderFilterOpen, setIsOrderFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data - Extended with Dashboard data consistency
  const allOrders = [
    {
      id: "ORD-2024-001",
      customer: { name: "John Smith", email: "john.smith@example.com", id: "CUST-001" },
      products: [
        { name: "iPhone 15 Pro Max", quantity: 2, pointsUsed: 25000 },
        { name: "MacBook Air M3", quantity: 1, pointsUsed: 25000 }
      ],
      total: { points: 50000 },
      status: "ordered",
      paymentStatus: "completed",
      shippingAddress: "123 Main St, Mumbai, IN 400001",
      orderDate: "2024-12-28T10:30:00Z",
      estimatedDelivery: "2024-12-30T18:00:00Z",
      trackingNumber: "TRK123456789",
      location: "Mumbai, IN",
      items: 3
    },
    {
      id: "ORD-2024-002",
      customer: { name: "Sarah Johnson", email: "sarah.johnson@example.com", id: "CUST-002" },
      products: [
        { name: "Sony WH-1000XM5", quantity: 2, pointsUsed: 5000 }
      ],
      total: { points: 5000 },
      status: "processing",
      paymentStatus: "completed",
      shippingAddress: "456 Oak Ave, Delhi, IN 110001",
      orderDate: "2024-12-28T09:15:00Z",
      estimatedDelivery: "2024-12-30T16:00:00Z",
      trackingNumber: "TRK987654321",
      location: "Delhi, IN",
      items: 2
    },
    {
      id: "ORD-2024-003",
      customer: { name: "Mike Chen", email: "mike.chen@example.com", id: "CUST-003" },
      products: [
        { name: "Canon EOS R5", quantity: 1, pointsUsed: 35000 }
      ],
      total: { points: 35000 },
      status: "added-to-cart",
      paymentStatus: "completed",
      shippingAddress: "789 Pine St, Bangalore, IN 560001", 
      orderDate: "2024-12-27T15:45:00Z",
      estimatedDelivery: "2024-12-29T18:00:00Z",
      trackingNumber: "TRK456789123",
      location: "Bangalore, IN",
      items: 1
    },
    {
      id: "ORD-2024-004",
      customer: { name: "Emma Wilson", email: "emma.wilson@example.com", id: "CUST-004" },
      products: [
        { name: "Samsung 55\" QLED TV", quantity: 1, pointsUsed: 18000 },
        { name: "Sony WH-1000XM5", quantity: 4, pointsUsed: 10000 }
      ],
      total: { points: 28000 },
      status: "ordered",
      paymentStatus: "completed",
      shippingAddress: "321 Elm St, Chennai, IN 600001",
      orderDate: "2024-12-27T14:20:00Z",
      estimatedDelivery: "2024-12-29T16:00:00Z",
      trackingNumber: "TRK555666777",
      location: "Chennai, IN",
      items: 5
    },
    {
      id: "ORD-2024-005",
      customer: { name: "David Brown", email: "david.brown@example.com", id: "CUST-005" },
      products: [
        { name: "iPhone 15 Pro Max", quantity: 1, pointsUsed: 12500 },
        { name: "Sony WH-1000XM5", quantity: 1, pointsUsed: 2500 }
      ],
      total: { points: 15000 },
      status: "processing",
      paymentStatus: "completed",
      shippingAddress: "654 Maple Dr, Hyderabad, IN 500001",
      orderDate: "2024-12-27T11:00:00Z",
      estimatedDelivery: "2024-12-30T18:00:00Z", 
      trackingNumber: "TRK888999000",
      location: "Hyderabad, IN",
      items: 2
    },
    // Additional orders to reach the dashboard total of 45,267
    {
      id: "ORD-2024-006",
      customer: { name: "Priya Sharma", email: "priya.sharma@example.com", id: "CUST-006" },
      products: [
        { name: "MacBook Air M3", quantity: 1, pointsUsed: 25000 }
      ],
      total: { points: 25000 },
      status: "processing",
      paymentStatus: "completed",
      shippingAddress: "987 Cedar St, Pune, IN 411001",
      orderDate: "2024-12-26T13:30:00Z",
      estimatedDelivery: "2024-12-29T18:00:00Z",
      trackingNumber: "TRK111222333",
      location: "Pune, IN",
      items: 1
    },
    {
      id: "ORD-2024-007",
      customer: { name: "Arjun Patel", email: "arjun.patel@example.com", id: "CUST-007" },
      products: [
        { name: "Canon EOS R5", quantity: 1, pointsUsed: 35000 }
      ],
      total: { points: 35000 },
      status: "cancelled",
      paymentStatus: "completed",
      shippingAddress: "147 Birch Ave, Kolkata, IN 700001",
      orderDate: "2024-12-26T10:15:00Z",
      estimatedDelivery: "2024-12-28T16:00:00Z",
      trackingNumber: "TRK444555666",
      location: "Kolkata, IN",
      items: 1
    },
    {
      id: "ORD-2024-008",
      customer: { name: "Kavya Reddy", email: "kavya.reddy@example.com", id: "CUST-008" },
      products: [
        { name: "Samsung 55\" QLED TV", quantity: 2, pointsUsed: 36000 }
      ],
      total: { points: 36000 },
      status: "ordered",
      paymentStatus: "completed",
      shippingAddress: "258 Spruce Ln, Jaipur, IN 302001",
      orderDate: "2024-12-25T16:45:00Z",
      estimatedDelivery: "2024-12-27T18:00:00Z",
      trackingNumber: "TRK777888999",
      location: "Jaipur, IN",
      items: 2
    }
  ];

  // Filter orders based on current filters
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      // Status filter
      if (orderFilters.statuses.length > 0 && !orderFilters.statuses.includes(order.status)) {
        return false;
      }

      // Date range filter
      if (orderFilters.dateRange.start) {
        const orderDate = new Date(order.orderDate);
        const startDate = new Date(orderFilters.dateRange.start);
        if (orderDate < startDate) return false;
      }
      if (orderFilters.dateRange.end) {
        const orderDate = new Date(order.orderDate);
        const endDate = new Date(orderFilters.dateRange.end);
        if (orderDate > endDate) return false;
      }

      // Points range filter
      if (orderFilters.pointsRange.min && order.total.points < parseFloat(orderFilters.pointsRange.min)) {
        return false;
      }
      if (orderFilters.pointsRange.max && order.total.points > parseFloat(orderFilters.pointsRange.max)) {
        return false;
      }

      // Customer filter
      if (orderFilters.customer && !order.customer.name.toLowerCase().includes(orderFilters.customer.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [allOrders, orderFilters]);

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "processing": 
        return {
          className: "bg-blue-100 text-blue-700 border-blue-200",
          variant: "secondary"
        };
      case "added-to-cart": 
        return {
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
          variant: "secondary"
        };
      case "ordered": 
        return {
          className: "bg-green-100 text-green-700 border-green-200",
          variant: "secondary"
        };
      case "cancelled": 
        return {
          className: "bg-red-100 text-red-700 border-red-200",
          variant: "secondary"
        };
      default: 
        return {
          className: "bg-gray-100 text-gray-700 border-gray-200",
          variant: "secondary"
        };
    }
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case "processing": return RefreshCw;
      case "added-to-cart": return ShoppingCart;
      case "ordered": return CheckCircle;
      case "cancelled": return X;
      default: return Clock;
    }
  };

  const handleOrderStatusFilter = (status, checked) => {
    setOrderFilters(prev => ({
      ...prev,
      statuses: checked 
        ? [...prev.statuses, status]
        : prev.statuses.filter(s => s !== status)
    }));
  };

  const clearOrderFilters = () => {
    setOrderFilters({
      statuses: [],
      dateRange: { start: "", end: "" },
      pointsRange: { min: "", max: "" },
      customer: ""
    });
  };

  const hasActiveOrderFilters = orderFilters.statuses.length > 0 ||
    orderFilters.dateRange.start || orderFilters.dateRange.end ||
    orderFilters.pointsRange.min || orderFilters.pointsRange.max ||
    orderFilters.customer;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Order Management</h1>
          
          <p className="text-muted-foreground">
            Track and manage customer orders, shipping, and fulfillment
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Order Statistics - Dashboard Data Consistency */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Ordered</span>
            </div>
            <div className="text-xl font-semibold">42,156</div>
            <div className="text-xs text-muted-foreground">93.1% of total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Processing</span>
            </div>
            <div className="text-xl font-semibold">2,567</div>
            <div className="text-xs text-muted-foreground">5.7% of total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Added to Cart</span>
            </div>
            <div className="text-xl font-semibold">344</div>
            <div className="text-xs text-muted-foreground">0.8% of total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Cancelled</span>
            </div>
            <div className="text-xl font-semibold">200</div>
            <div className="text-xs text-muted-foreground">0.4% of total</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Order Stats and Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <Card className="px-6 py-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{filteredOrders.length} Recent Orders</span>
            </div>
          </Card>
          <Card className="px-6 py-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">{filteredOrders.filter(o => o.status === 'ordered').length} Ordered</span>
            </div>
          </Card>
          <Card className="px-6 py-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{filteredOrders.filter(o => o.status === 'processing').length} Processing</span>
            </div>
          </Card>
          <Card className="px-6 py-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{filteredOrders.filter(o => o.status === 'added-to-cart').length} Added to Cart</span>
            </div>
          </Card>
          <Card className="px-6 py-3">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-sm">{filteredOrders.filter(o => o.status === 'cancelled').length} Cancelled</span>
            </div>
          </Card>
        </div>
        <div className="flex gap-2">
          <Popover open={isOrderFilterOpen} onOpenChange={setIsOrderFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={hasActiveOrderFilters ? "border-primary bg-primary/5" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {hasActiveOrderFilters && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    {[
                      ...orderFilters.statuses,
                      orderFilters.dateRange.start && "date",
                      orderFilters.pointsRange.min && "points",
                      orderFilters.customer && "customer"
                    ].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4>Filter Orders</h4>
                  {hasActiveOrderFilters && (
                    <Button variant="ghost" size="sm" onClick={clearOrderFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className="text-sm">Status</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["ordered", "processing", "added-to-cart", "cancelled"].map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`order-status-${status}`}
                          checked={orderFilters.statuses.includes(status)}
                          onCheckedChange={(checked) => handleOrderStatusFilter(status, checked)}
                        />
                        <Label htmlFor={`order-status-${status}`} className="text-sm capitalize">
                          {status === "added-to-cart" ? "Added to Cart" : status}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Date Range */}
                <div className="space-y-2">
                  <Label className="text-sm">Order Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Start Date"
                      type="date"
                      value={orderFilters.dateRange.start}
                      onChange={(e) => setOrderFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="End Date"
                      type="date"
                      value={orderFilters.dateRange.end}
                      onChange={(e) => setOrderFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                {/* Points Range */}
                <div className="space-y-2">
                  <Label className="text-sm">Points Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Min Points"
                      type="number"
                      value={orderFilters.pointsRange.min}
                      onChange={(e) => setOrderFilters(prev => ({
                        ...prev,
                        pointsRange: { ...prev.pointsRange, min: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Max Points"
                      type="number"
                      value={orderFilters.pointsRange.max}
                      onChange={(e) => setOrderFilters(prev => ({
                        ...prev,
                        pointsRange: { ...prev.pointsRange, max: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                {/* Customer Search */}
                <div className="space-y-2">
                  <Label className="text-sm">Customer Name</Label>
                  <Input
                    placeholder="Search by customer name"
                    value={orderFilters.customer}
                    onChange={(e) => setOrderFilters(prev => ({
                      ...prev,
                      customer: e.target.value
                    }))}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Orders</CardTitle>
          <CardDescription>
            Monitor order status, fulfillment, and customer communications
            {hasActiveOrderFilters && (
              <span className="text-primary"> • {filteredOrders.length} of {allOrders.length} orders shown</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Points Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = getOrderStatusIcon(order.status);
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{order.id}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(order.id)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <div key={index} className="text-sm">
                            <span>{product.name}</span>
                            <span className="text-muted-foreground"> × {product.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Package className="h-3 w-3" />
                        <span>{order.total.points.toLocaleString()} pts</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getOrderStatusStyle(order.status).variant}
                        className={`flex items-center gap-1 w-fit ${getOrderStatusStyle(order.status).className}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{order.status === "added-to-cart" ? "Added to Cart" : order.status === "ordered" ? "Ordered" : order.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                              <DialogDescription>
                                Complete order information and management options
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm text-muted-foreground mb-2">Customer Information</h4>
                                  <div className="space-y-1">
                                    <p>{order.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                                    <p className="text-sm text-muted-foreground">{order.customer.id}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm text-muted-foreground mb-2">Order Status</h4>
                                  <Badge 
                                    variant={getOrderStatusStyle(order.status).variant}
                                    className={`flex items-center gap-1 w-fit ${getOrderStatusStyle(order.status).className}`}
                                  >
                                    <StatusIcon className="h-3 w-3" />
                                    <span className="capitalize">{order.status === "added-to-cart" ? "Added to Cart" : order.status === "ordered" ? "Ordered" : order.status}</span>
                                  </Badge>
                                </div>
                              </div>

                              {/* Products */}
                              <div>
                                <h4 className="text-sm text-muted-foreground mb-2">Products Ordered</h4>
                                <div className="border rounded-lg">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Points Used</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {order.products.map((product, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{product.name}</TableCell>
                                          <TableCell>{product.quantity}</TableCell>
                                          <TableCell>{product.pointsUsed.toLocaleString()}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>

                              {/* Shipping & Dates */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm text-muted-foreground mb-2">Shipping Address</h4>
                                  <p className="text-sm">{order.shippingAddress}</p>
                                  {order.trackingNumber && order.trackingNumber !== "DIGITAL-001" && (
                                    <div className="mt-2">
                                      <p className="text-sm text-muted-foreground">Tracking Number</p>
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-sm">{order.trackingNumber}</span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => copyToClipboard(order.trackingNumber)}
                                        >
                                          <Copy className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm text-muted-foreground mb-2">Important Dates</h4>
                                  <div className="space-y-2">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Order Date</p>
                                      <p className="text-sm">{new Date(order.orderDate).toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                                      <p className="text-sm">{new Date(order.estimatedDelivery).toLocaleString()}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-4 border-t">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Print Invoice
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}