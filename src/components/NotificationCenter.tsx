import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  Bell,
  BellOff,
  Package,
  ShoppingCart,
  AlertTriangle,
  CreditCard,
  Settings,
  Star,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Archive,
  Trash2,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Monitor
} from "lucide-react";
import { useCurrency } from "../hooks/useCurrency";
import { toast } from "sonner@2.0.3";

interface NotificationSettings {
  orders: {
    newOrders: boolean;
    orderUpdates: boolean;
    orderCancellations: boolean;
    sound: boolean;
    email: boolean;
    push: boolean;
  };
  inventory: {
    lowStock: boolean;
    outOfStock: boolean;
    restock: boolean;
    sound: boolean;
    email: boolean;
    push: boolean;
  };
  payments: {
    paymentReceived: boolean;
    paymentFailed: boolean;
    refunds: boolean;
    sound: boolean;
    email: boolean;
    push: boolean;
  };
  reviews: {
    newReviews: boolean;
    lowRatings: boolean;
    sound: boolean;
    email: boolean;
    push: boolean;
  };
  system: {
    maintenance: boolean;
    security: boolean;
    updates: boolean;
    sound: boolean;
    email: boolean;
    push: boolean;
  };
}

export function NotificationCenter() {
  const { formatCurrency, convertCurrency } = useCurrency();
  
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orders: {
      newOrders: true,
      orderUpdates: true,
      orderCancellations: true,
      sound: true,
      email: true,
      push: true
    },
    inventory: {
      lowStock: true,
      outOfStock: true,
      restock: false,
      sound: true,
      email: true,
      push: false
    },
    payments: {
      paymentReceived: true,
      paymentFailed: true,
      refunds: true,
      sound: true,
      email: true,
      push: true
    },
    reviews: {
      newReviews: true,
      lowRatings: true,
      sound: false,
      email: true,
      push: false
    },
    system: {
      maintenance: true,
      security: true,
      updates: false,
      sound: true,
      email: true,
      push: true
    }
  });

  const mockNotifications = [
    {
      id: "N001",
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-2024-1247 from Priya Sharma for ₹2,350",
      time: "2024-12-18T14:30:00Z",
      isRead: false,
      priority: "high",
      category: "New Order"
    },
    {
      id: "N002",
      type: "inventory",
      title: "Low Stock Alert",
      message: "Premium Wireless Headphones - Only 8 units remaining",
      time: "2024-12-18T14:15:00Z",
      isRead: false,
      priority: "medium",
      category: "Inventory"
    },
    {
      id: "N003",
      type: "payment",
      title: "Payment Received",
      message: "Payment of ₹4,750 received for Order #ORD-2024-1246",
      time: "2024-12-18T13:30:00Z",
      isRead: false,
      priority: "high",
      category: "Payment"
    },
    // ... more notifications
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'inventory':
        return <Package className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'review':
        return <Star className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const updateNotificationSetting = (category: keyof NotificationSettings, setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    toast.success("Notification settings updated");
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Notification Center</h1>
          <p className="text-muted-foreground">
            Manage your notifications and communication preferences
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="preferences">Delivery Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="order">Orders</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="payment">Payments</SelectItem>
                      <SelectItem value="review">Reviews</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notification</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-accent">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            notification.priority === 'high' ? 'destructive' : 
                            notification.priority === 'medium' ? 'secondary' : 'outline'
                          }
                        >
                          {notification.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatTime(notification.time)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <div className="h-2 w-2 bg-primary rounded-full" />
                          )}
                          <span className="text-sm">
                            {notification.isRead ? 'Read' : 'Unread'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            {Object.entries(notificationSettings).map(([category, settings]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    {getNotificationIcon(category)}
                    {category} Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure when you want to receive {category} notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings).map(([setting, enabled]) => (
                    <div key={setting} className="flex items-center justify-between">
                      <div>
                        <Label className="capitalize">
                          {setting.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {setting === 'sound' && 'Play notification sounds'}
                          {setting === 'email' && 'Send email notifications'}
                          {setting === 'push' && 'Send push notifications'}
                          {setting.includes('new') && `Get notified about new ${category}`}
                          {setting.includes('low') && 'Alert when items are running low'}
                          {setting.includes('out') && 'Alert when items are out of stock'}
                          {setting.includes('updates') && `Get updates about ${category} changes`}
                          {setting.includes('cancellations') && 'Get notified when orders are cancelled'}
                          {setting.includes('failed') && 'Get notified about failed payments'}
                          {setting.includes('maintenance') && 'Get notified about system maintenance'}
                          {setting.includes('security') && 'Get security-related notifications'}
                        </p>
                      </div>
                      <Switch
                        checked={enabled as boolean}
                        onCheckedChange={(value) => 
                          updateNotificationSetting(category as keyof NotificationSettings, setting, value)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications on mobile devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications on your mobile device
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound & Vibration</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds and vibrate for notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lock Screen</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications on lock screen
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure email notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Instant Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails immediately for high priority alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a daily summary of all notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly business performance reports
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Desktop Notifications
                </CardTitle>
                <CardDescription>
                  Configure desktop and browser notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications in your browser
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Desktop Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Show system notifications on desktop
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notification Sounds</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for desktop notifications
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiet Hours</CardTitle>
                <CardDescription>
                  Set times when you don't want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Pause non-urgent notifications during specified hours
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Input type="time" defaultValue="22:00" />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekend Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Apply quiet hours on weekends too
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}