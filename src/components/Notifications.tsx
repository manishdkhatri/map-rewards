import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Bell,
  Package,
  ShoppingCart,
  AlertTriangle,
  CreditCard,
  Settings,
  User,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useCurrency } from "../hooks/useCurrency";

interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'payment' | 'system' | 'review' | 'alert';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  data?: any;
}

export function Notifications() {
  const { formatCurrency, convertCurrency } = useCurrency();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "N001",
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-2024-1247 from Priya Sharma for ₹2,350",
      time: "2 minutes ago",
      isRead: false,
      priority: "high",
      actionUrl: "/orders",
      data: { orderId: "ORD-2024-1247", amount: 2350 }
    },
    {
      id: "N002",
      type: "inventory",
      title: "Low Stock Alert",
      message: "Premium Wireless Headphones - Only 8 units remaining",
      time: "15 minutes ago",
      isRead: false,
      priority: "medium",
      actionUrl: "/estore",
      data: { productId: "PRD001", stock: 8 }
    },
    {
      id: "N003",
      type: "payment",
      title: "Payment Received",
      message: "Payment of ₹4,750 received for Order #ORD-2024-1246",
      time: "1 hour ago",
      isRead: false,
      priority: "high",
      data: { amount: 4750, orderId: "ORD-2024-1246" }
    },
    {
      id: "N004",
      type: "review",
      title: "New Customer Review",
      message: "Rajesh Kumar left a 5-star review for Luxury Spa Experience",
      time: "2 hours ago",
      isRead: true,
      priority: "low",
      data: { rating: 5, productId: "PRD003" }
    },
    {
      id: "N005",
      type: "order",
      title: "Order Shipped",
      message: "Order #ORD-2024-1245 has been shipped to Anita Patel",
      time: "3 hours ago",
      isRead: true,
      priority: "medium",
      data: { orderId: "ORD-2024-1245" }
    },
    {
      id: "N006",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight from 2:00 AM to 4:00 AM IST",
      time: "4 hours ago",
      isRead: false,
      priority: "medium"
    },
    {
      id: "N007",
      type: "alert",
      title: "Security Alert",
      message: "New login detected from Mumbai. Was this you?",
      time: "6 hours ago",
      isRead: true,
      priority: "high"
    },
    {
      id: "N008",
      type: "order",
      title: "Order Cancelled",
      message: "Order #ORD-2024-1244 was cancelled by Vikram Singh",
      time: "1 day ago",
      isRead: true,
      priority: "low",
      data: { orderId: "ORD-2024-1244" }
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length, 
    [notifications]
  );

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

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') {
      return 'text-red-600';
    }
    switch (type) {
      case 'order':
        return 'text-green-600';
      case 'inventory':
        return 'text-orange-600';
      case 'payment':
        return 'text-blue-600';
      case 'system':
        return 'text-purple-600';
      case 'review':
        return 'text-yellow-600';
      case 'alert':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
    toast.success("All notifications marked as read");
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
    toast.success("Notification removed");
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      // In a real app, this would navigate to the appropriate section
      toast.info(`Navigate to ${notification.actionUrl}`);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </CardDescription>
              </div>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-accent/50 cursor-pointer border-l-2 transition-colors ${
                        !notification.isRead 
                          ? 'bg-accent/30 border-l-primary' 
                          : 'border-l-transparent'
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full bg-accent ${getNotificationColor(notification.type, notification.priority)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`}>
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="h-2 w-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant={getBadgeVariant(notification.priority)} className="text-xs">
                                {notification.priority}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="p-4">
                <Button variant="outline" className="w-full" size="sm">
                  View All Notifications
                </Button>
              </div>
            </>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  );
}